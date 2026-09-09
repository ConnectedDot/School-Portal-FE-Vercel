import { useParams, useNavigate } from 'react-router-dom';
import { StudentOnboardingForm } from '../../../components/forms/StudentOnboardingForm';
import { AdnPaths } from '@/router/paths';
// import { AdminPaths } from '../../../router/paths';

const StudentEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const handleSubmit = async (data: Record<string, unknown>) => {
        // console.log('Updating student:', id, 'with data:', data);

        try {
            // TODO: Replace with actual API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            alert('Student updated successfully!');
            navigate(AdnPaths.STUDENTS_VIEW.replace(':id', id!));
        } catch (error) {
            console.error('Error updating student:', error);
            alert('Error updating student. Please try again.');
        }
    };

    const handleCancel = () => {
        navigate(AdnPaths.STUDENTS_VIEW.replace(':id', id!));
    };

    return (
        <div className="container mx-auto py-6">
            <StudentOnboardingForm
                studentId={id}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
            />
        </div>
    );
};

export default StudentEdit;
