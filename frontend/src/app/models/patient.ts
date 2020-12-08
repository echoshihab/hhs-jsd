

export interface IPatientEnvelope{
    patients: IPatient[];
    patientsCount: number;

}

export interface IPatientFormValues{
    firstName: string;
    lastName : string;
    dateOfBirth: Date;
    gender: string;
    healthCardNumber: number;
    versionCode: string;
}

export interface IPatient extends IPatientFormValues{
    id: number
}