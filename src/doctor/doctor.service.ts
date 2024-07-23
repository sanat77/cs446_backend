import { Doctor } from './doctor.schema';
import { IDoctor } from '../interfaces/IDoctor';
import { DistanceBetweenTwoCoordinatesOnEarth } from '../utility/DistanceBetweenTwoCoordinatesOnEarth';

export class DoctorService {
    public async createDoctor(data: IDoctor): Promise<IDoctor> {
        const doctor = new Doctor(data);
        return await doctor.save();
    }

    public async getDoctors(): Promise<IDoctor[]> {
        const doctors = await Doctor.aggregate([
            {
                $lookup: {
                    from: 'bookings',
                    localField: '_id',
                    foreignField: 'doctorId',
                    as: 'bookings'
                }
            },
            {
                $addFields: {
                    'nextAvailableSlot1': {
                        $arrayElemAt: [
                            {
                                $filter: {
                                    input: '$bookings',
                                    as: 'slot',
                                    cond: { $eq: ['$$slot.status', 'AVAILABLE'] }
                                }
                            },
                            0
                        ]
                    },
                    'isAvailable': {
                        $cond: {
                            if: { $eq: ['$bookings', []] },
                            then: false,
                            else: true
                        }
                    }
                }
            },
            {
                $addFields: {
                    nextAvailableSlot: {
                        $cond: {
                            if: { $eq: ['$nextAvailableSlot1', null] },
                            then: null,
                            else: '$nextAvailableSlot1.startTime'
                        }
                    }
                }
            },
            {
                $group: {
                    _id: '$_id',
                    doc: { $first: '$$ROOT' }
                }
            },
            {
                $replaceRoot: { newRoot: '$doc' }
            },
            {
                $unset: ['bookings', 'nextAvailableSlot1']
            },
            { 
                $sort: { rating: -1 } 
            }
        ]);
        if (!doctors) {
            return [];
        }
        return doctors;
    }
    

    public async getDoctorById(id: String) {
        const doctor = await Doctor.aggregate([
            {
                $match: {
                    _id: id
                }
            },
            {
                $lookup: {
                    from: 'bookings',
                    localField: '_id',
                    foreignField: 'doctorId',
                    as: 'bookings'
                }
            },
            {
                $addFields: {
                    'nextAvailableSlot1': {
                        $arrayElemAt: [
                            {
                                $filter: {
                                    input: '$bookings',
                                    as: 'slot',
                                    cond: { $eq: ['$$slot.status', 'AVAILABLE'] }
                                }
                            },
                            0
                        ]
                    },
                    'isAvailable': {
                        $cond: {
                            if: { $eq: ['$bookings', []] },
                            then: false,
                            else: true
                        }
                    },
                }
            },
            {
                $addFields: {
                    nextAvailableSlot: {
                        $cond: {
                            if: { $eq: ['$nextAvailableSlot1', null] },
                            then: null,
                            else: '$nextAvailableSlot1.startTime'
                        }
                    }
                }
            },
            {
                $group: {
                    _id: '$_id',
                    doc: { $first: '$$ROOT' }
                }
            },
            {
                $replaceRoot: { newRoot: '$doc' }
            },
            {
                $unset: ['bookings', 'nextAvailableSlot1']
            }
        ]);
        if (!doctor) {
            return null;
        }
        return doctor;
    }
    

    public async getDoctorsWithFilters(
        doctorName?: string,
        curLat?: number,
        curLong?: number,
        maxDistance?: number,
        speciality?: string,
        minRating?: number,
        insuranceProvider?: string,
        startDate?: string,
        endDate?: string
    ) {
        const matchQuery: any = {};
    
        if (doctorName) {
            matchQuery.name = { $regex: doctorName, $options: 'i' };
        }
        if (speciality) {
            matchQuery.specialty = speciality;
        }
        if (minRating !== undefined) {
            matchQuery.rating = { $gte: minRating };
        }
        if (insuranceProvider) {
            matchQuery.insuranceProviders = insuranceProvider;
        }
    
        let dateFilter: any = {};
        if (startDate) {
            const startTimestamp = new Date(startDate).getTime();
            dateFilter['bookings.startTimeTimestamp'] = { $gte: startTimestamp };
        }
        if (endDate) {
            const endTimestamp = new Date(endDate).getTime();
            dateFilter['bookings.startTimeTimestamp'] = dateFilter['bookings.startTimeTimestamp'] || {};
            dateFilter['bookings.startTimeTimestamp'].$lte = endTimestamp;
        }
    
        const aggregationPipeline: any[] = [
            { $match: matchQuery },
            {
                $lookup: {
                    from: 'bookings',
                    localField: '_id',
                    foreignField: 'doctorId',
                    as: 'bookings'
                }
            },
            {
                $addFields: {
                    'bookings.startTimeTimestamp': {
                        $map: {
                            input: '$bookings',
                            as: 'booking',
                            in: { $toLong: { $toDate: '$$booking.startTime' } }
                        }
                    }
                },
            },
        ];
    
        if (Object.keys(dateFilter).length > 0) {
            aggregationPipeline.push({ $match: dateFilter });
        }
    
        aggregationPipeline.push(
            {
                $addFields: {
                    'nextAvailableSlot1': {
                        $arrayElemAt: [
                            {
                                $filter: {
                                    input: '$bookings',
                                    as: 'slot',
                                    cond: { $eq: ['$$slot.status', 'AVAILABLE'] }
                                }
                            },
                            0
                        ]
                    },
                    'isAvailable': {
                        $cond: {
                            if: { $eq: ['$bookings', []] },
                            then: false,
                            else: true
                        }
                    }
                }
            },
            {
                $addFields: {
                    nextAvailableSlot: {
                        $cond: {
                            if: { $eq: ['$nextAvailableSlot1', null] },
                            then: null,
                            else: '$nextAvailableSlot1.startTime'
                        }
                    }
                }
            },
            {
                $group: {
                    _id: '$_id',
                    doc: { $first: '$$ROOT' }
                }
            },
            { $replaceRoot: { newRoot: '$doc' } },
            { $unset: ['bookings', 'nextAvailableSlot1'] },
            { $sort: { rating: -1 } }
        );
    
        const doctorsWithoutDistanceFilters = await Doctor.aggregate(aggregationPipeline);
    
        if (!doctorsWithoutDistanceFilters) {
            return [];
        }
    
        if (curLat !== undefined && curLong !== undefined && maxDistance !== undefined) {
            const doctorsWithDistanceFilters = doctorsWithoutDistanceFilters.filter(
                (doctor) => {
                    const distance = DistanceBetweenTwoCoordinatesOnEarth(
                        curLat,
                        curLong,
                        doctor.latitude,
                        doctor.longitude
                    );
                    return distance <= maxDistance;
                }
            );
            return doctorsWithDistanceFilters;
        }
    
        return doctorsWithoutDistanceFilters;
    }
    
    
       

    public async updateDoctorById(
        id: String,
        data: Partial<IDoctor>
    ): Promise<IDoctor | null> {
        return await Doctor.findOneAndUpdate({ _id: id }, data, { new: true });
    }

    public async deleteDoctorById(id: String): Promise<IDoctor | null> {
        return await Doctor.findOneAndDelete({ _id: id });
    }
}
