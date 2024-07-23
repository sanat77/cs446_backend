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
        doctorName: string,
        curLat: string,
        curLong: string,
        maxDistance: string,
        speciality: string,
        minRating: string,
        insuranceProvider: string,
        startDate: string,
        endDate: string
    ) {
        const startTimestamp = new Date(startDate).getTime();
        const endTimestamp = new Date(endDate).getTime();
        const doctorsWithoutDistanceFilters = await Doctor.aggregate([
            {
                $match: {
                    name: { $regex: doctorName, $options: 'i' },
                    specialty: speciality,
                    rating: { $gte: Number(minRating) },
                    insuranceProviders: insuranceProvider
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
                    'bookings.startTimeTimestamp': {
                        $map: {
                            input: '$bookings',
                            as: 'booking',
                            in: { $toLong: { $toDate: '$$booking.startTime' } }
                        }
                    }
                },
            },
            {
                $match: {
                    'bookings.startTimeTimestamp': { $gte: startTimestamp, $lte: endTimestamp }
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
            }
        ]);
        if (!doctorsWithoutDistanceFilters) {
            return [];
        }
        const doctorsWithDistanceFilters = doctorsWithoutDistanceFilters.filter(
            (doctor) => {
                const distance = DistanceBetweenTwoCoordinatesOnEarth(
                    parseFloat(curLat),
                    parseFloat(curLong),
                    doctor.latitude,
                    doctor.longitude
                );
                return distance <= parseFloat(maxDistance);
            }
        );
        return doctorsWithDistanceFilters;
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
