// Type for the teacher creation data
// export interface TeacherData {
//     firstName: string;
//     lastName: string;
//     email: string;
//     password: string;
//     phoneNumber: string;
//     dateOfBirth: string;
//     gender: 'Male' | 'Female' | 'Other';
//     address: string;
//     department: string;
//     specialization: string;
//     qualification: string;
//     experience: string;
//     joiningDate: string;
// }

// Type for the teacher update data
export interface TeacherData {
    [x: string]: string | any |  undefined;
    id?: string;
    ID?: string;
    firstName: string;
    lastName: string;
    email: string; // must be an email
    password?: string;
    dateOfBirth: string;
    gender: 'MALE' | 'FEMALE' | 'OTHER';
    qualification: string;
    phone: string; // must be a string, should not be empty
    employmentType: 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'INTERN'; // should not be empty
}


