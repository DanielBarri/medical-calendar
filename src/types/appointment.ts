/**
 * Appointment Type Definitions
 *
 * Type definitions for the medical calendar appointment system.
 * Supports appointment status tracking, type classification, and patient information.
 *
 * @module types/appointment
 */

/**
 * Appointment status representing the lifecycle of an appointment
 *
 * - booked: Just scheduled, awaiting confirmation
 * - confirmed: Patient has confirmed attendance
 * - arrived: Patient checked in at office
 * - started: Consultation in progress
 * - completed: Appointment finished successfully
 * - no-show: Patient didn't show up
 * - cancelled: Appointment was cancelled
 */
export type AppointmentStatus =
  | 'booked'
  | 'confirmed'
  | 'arrived'
  | 'started'
  | 'completed'
  | 'no-show'
  | 'cancelled';

/**
 * Appointment type classification
 *
 * - first-visit: Patient's first appointment
 * - follow-up: Return visit for ongoing treatment
 * - procedure: Medical procedure or test
 * - emergency: Urgent/emergency appointment
 */
export type AppointmentType = 'first-visit' | 'follow-up' | 'procedure' | 'emergency';

/**
 * Main appointment interface
 */
export interface Appointment {
  /**
   * Unique identifier for the appointment
   * Readonly as IDs should never change after creation
   */
  readonly id: string;

  /**
   * Patient's full name
   */
  patientName: string;

  /**
   * Patient's phone number (optional)
   */
  patientPhone?: string;

  /**
   * Patient's email address (optional)
   */
  patientEmail?: string;

  /**
   * Appointment start time
   */
  startTime: Date;

  /**
   * Appointment end time
   */
  endTime: Date;

  /**
   * Duration in minutes (calculated from start/end times)
   * Readonly as it should be derived from startTime and endTime
   */
  readonly duration: number;

  /**
   * Type of appointment
   */
  type: AppointmentType;

  /**
   * Current status of appointment
   */
  status: AppointmentStatus;

  /**
   * Additional notes about the appointment
   */
  notes?: string;

  /**
   * Whether this is a new patient
   * Readonly as patient status shouldn't change during appointment lifecycle
   */
  readonly isNewPatient: boolean;
}

/**
 * Grouped appointments by overlapping time slots
 * Used for calculating positioning of overlapping appointments
 */
export interface AppointmentGroup {
  /**
   * Appointments in this group that overlap
   */
  appointments: Appointment[];

  /**
   * Start time of the group (earliest start time)
   */
  startTime: Date;

  /**
   * End time of the group (latest end time)
   */
  endTime: Date;
}
