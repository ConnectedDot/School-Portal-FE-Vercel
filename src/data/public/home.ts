/**
 * Public Website Dummy Data
 */

export interface SchoolStats {
    totalStudents: number;
    totalTeachers: number;
    totalAlumni: number;
    universityPlacement: number;
    yearsOfExcellence: number;
}

export const dummySchoolStats: SchoolStats = {
    totalStudents: 1247,
    totalTeachers: 89,
    totalAlumni: 3450,
    universityPlacement: 95,
    yearsOfExcellence: 25,
};

export interface Testimonial {
    id: string;
    name: string;
    role: string;
    year: string;
    content: string;
}

export const dummyTestimonials: Testimonial[] = [
    {
        id: '1',
        name: 'Adebayo Oluwaseun',
        role: 'Alumni',
        year: 'Class of 2020',
        content: 'Fortis School provided me with an excellent foundation for my university studies. The teachers were dedicated and the facilities were top-notch.',
    },
    {
        id: '2',
        name: 'Mrs. Chioma Okonkwo',
        role: 'Parent',
        year: 'Current Parent',
        content: 'I am impressed with the quality of education my children receive. The school maintains high standards while ensuring students are well-rounded.',
    },
    {
        id: '3',
        name: 'Emeka Nwosu',
        role: 'Student',
        year: 'SS3',
        content: 'The school has helped me discover my passion for science. The practical labs and supportive teachers have made learning enjoyable.',
    },
];
