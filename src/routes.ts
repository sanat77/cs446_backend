import { Router } from 'express';
import { DoctorController } from './doctor/doctor.controller';
import { UserController } from './user/user.controller';
import { PatientController } from './patient/patient.controller';
import { BookingController } from './booking/booking.controller';
import { AppointmentController } from './appointment/appointment.controller';
import { ReviewController } from './review/review.controller';

const router = Router();

const doctorController = new DoctorController();
const patientController = new PatientController();
const userController = new UserController();
const bookingController = new BookingController();
const appointmentController = new AppointmentController();
const reviewController = new ReviewController();

// Sample Route
router.get('/', (req, res) => {
    res.status(200).send('Hello World!');
});

// Doctor Routes
router.post('/create-doctor', (req, res) => {
    doctorController.CreateDoctor(req, res);
});
router.get('/all-doctors', (req, res) => {
    doctorController.GetAllDoctors(req, res);
});
router.get('/one-doctor/:id', (req, res) => {
    doctorController.GetDoctorById(req, res);
});
router.get('/filter-doctors', (req, res) => {
    doctorController.GetDoctorsWithFilters(req, res);
});
router.put('/update-doctor/:id', (req, res) => {
    doctorController.UpdateDoctor(req, res);
});
router.delete('/delete-doctor/:id', (req, res) => {
    doctorController.DeleteDoctor(req, res);
});

// Patient Routes
router.post('/create-patient', (req, res) => {
    patientController.CreatePatient(req, res);
});

router.get('/all-patients', (req, res) => {
    patientController.GetAllPatients(req, res);
});

router.get('/one-patient/:id', (req, res) => {
    patientController.GetPatientById(req, res);
});

router.put('/update-patient/:id', (req, res) => {
    patientController.UpdatePatient(req, res);
});

router.delete('/delete-patient/:id', (req, res) => {
    patientController.DeletePatient(req, res);
})

// User Signup/Login Routes
router.post('/create-user', (req, res) => {
    userController.CreateUser(req, res);
});

router.get('/get-user/:username/:password', (req, res) => {
    userController.GetUser(req, res);
});

router.post('/update-user', (req, res) => {
    userController.UpdateUser(req, res);
});

// Booking Routes
router.get('/get-bookings-by-doctorId/:doctorId', (req, res) => {
    bookingController.getBookingsByDoctorId(req, res);
});

router.get('/get-bookings-byId/:id', (req, res) => {
    bookingController.getBookingById(req, res);
});

router.post('/create-booking', (req, res) => {
    bookingController.CreateBooking(req, res);
});

router.delete('/delete-booking/:id', (req, res) => {
    bookingController.DeleteBooking(req, res);
});

router.put('/set-booking-as-booked/:id', (req, res) => {
    bookingController.SetBookingAsBooked(req, res);
});

// Appointment routes
router.post('/create-appointment', (req, res) => {
    appointmentController.CreateAppointment(req, res);
});

router.delete('/delete-appointment/:id', (req, res) => {
    appointmentController.DeleteAppointment(req, res);
});

router.get('/get-appointments-by-patientId/:patientId', (req, res) => {
    appointmentController.getAppointmentsByPatientId(req, res);
});

router.get('/get-appointments-by-doctorId/:doctorId', (req, res) => {
    appointmentController.getAppointmentsByDoctorId(req, res);
});

router.get('/get-appointment-byId/:id', (req, res) => {
    appointmentController.getAppointmentById(req, res);
});

// Review Routes
router.post('/create-review', (req, res) => {
    reviewController.CreateReview(req, res);
});

router.get('/all-reviews', (req, res) => {
    reviewController.GetAllReviews(req, res);
});

router.get('/patient-reviews/:patientId', (req, res) => {
    reviewController.GetReviewByPatientId(req, res);
});

router.get('/doctor-reviews/:doctorId', (req, res) => {
    reviewController.GetReviewByDoctorId(req, res);
});

router.put('/update-review/:id', (req, res) => {
    reviewController.UpdateReview(req, res);
});

router.delete('/delete-review/:id', (req, res) => {
    reviewController.DeleteReview(req, res);
});

export default router;
