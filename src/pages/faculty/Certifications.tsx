import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Award, Plus, Edit, Trash2, Loader2, Calendar, Building, ExternalLink } from 'lucide-react';
import { useGetTeacherProfile, useCreateCertification, useUpdateCertification, useDeleteCertification, type Certification } from '@/hooks/teachers';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { ConfirmDialog } from '@/components/common/ConfirmDialog';

const Certifications = () => {
    const { data: profile, isLoading, refetch } = useGetTeacherProfile();
    const { mutate: createCert, isPending: isCreating } = useCreateCertification(async () => {
        await refetch();
        setIsAddDialogOpen(false);
        resetForm();
    });
    const { mutate: deleteCert } = useDeleteCertification();

    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
    const [certToDelete, setCertToDelete] = useState<Certification | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        issuingOrganization: '',
        issueDate: '',
        expiryDate: '',
        credentialId: '',
        credentialUrl: '',
        description: '',
    });

    const resetForm = () => {
        setFormData({
            name: '',
            issuingOrganization: '',
            issueDate: '',
            expiryDate: '',
            credentialId: '',
            credentialUrl: '',
            description: '',
        });
    };

    const handleAdd = () => {
        setIsAddDialogOpen(true);
        resetForm();
    };

    const handleEdit = (cert: Certification) => {
        setSelectedCert(cert);
        setFormData({
            name: cert.name,
            issuingOrganization: cert.issuingOrganization || cert.issuedBy,
            issueDate: cert.issueDate || cert.issuedAt,
            expiryDate: cert.expiryDate || '',
            credentialId: cert.credentialId || '',
            credentialUrl: cert.credentialUrl || '',
            description: cert.description || '',
        });
        setIsEditDialogOpen(true);
    };

    const handleDelete = (certId: string) => setCertToDelete(
        certifications.find((cert: Certification) => cert.id === certId) || null
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        createCert(formData);
    };

    const certifications = (profile as any)?.certifications || [];

    if (isLoading) {
        return (
            <div className="space-y-6">
                <Skeleton className="h-12 w-1/3" />
                <Skeleton className="h-64 w-full" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
                        <Award className="h-8 w-8" />
                        My Certifications
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        Manage your professional certifications and credentials
                    </p>
                </div>
                <Button className='text-foreground' onClick={handleAdd}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Certification
                </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Total Certifications</CardTitle>
                        <div className="text-2xl font-bold">{certifications.length}</div>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Active</CardTitle>
                        <div className="text-2xl font-bold">
                            {certifications.filter((c: Certification) => 
                                !c.expiryDate || new Date(c.expiryDate) > new Date()
                            ).length}
                        </div>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Expired</CardTitle>
                        <div className="text-2xl font-bold">
                            {certifications.filter((c: Certification) => 
                                c.expiryDate && new Date(c.expiryDate) <= new Date()
                            ).length}
                        </div>
                    </CardHeader>
                </Card>
            </div>

            {/* Certifications List */}
            {certifications.length === 0 ? (
                <Card>
                    <CardContent className="pt-6 text-center py-12">
                        <Award className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-xl font-semibold mb-2">No Certifications Yet</h3>
                        <p className="text-muted-foreground mb-4">
                            Add your professional certifications to showcase your qualifications.
                        </p>
                        <Button className='text-foreground' onClick={handleAdd}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Your First Certification
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {certifications.map((cert: Certification) => {
                        const isExpired = cert.expiryDate && new Date(cert.expiryDate) <= new Date();
                        return (
                            <Card key={cert.id} className={isExpired ? 'border-destructive/50' : ''}>
                                <CardHeader>BAck
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <CardTitle className="text-lg flex items-center gap-2">
                                                <Award className="h-5 w-5 text-primary" />
                                                {cert.name}
                                            </CardTitle>
                                            <CardDescription className="mt-1 flex items-center gap-1">
                                                <Building className="h-3 w-3" />
                                                {cert.issuingOrganization}
                                            </CardDescription>
                                        </div>
                                        <div className="flex gap-1">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleEdit(cert)}
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleDelete(cert.id)}
                                            >
                                                <Trash2 className="h-4 w-4 text-destructive" />
                                            </Button>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {cert.description && (
                                        <p className="text-sm text-muted-foreground">{cert.description}</p>
                                    )}

                                    <div className="space-y-2 text-sm">
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <Calendar className="h-4 w-4" />
                                            <span>
                                                Issued: {new Date(cert.issueDate || cert.issuedAt).toLocaleDateString()}
                                                {cert.expiryDate && (
                                                    <span className={isExpired ? 'text-destructive ml-2' : 'ml-2'}>
                                                        • Expires: {new Date(cert.expiryDate).toLocaleDateString()}
                                                        {isExpired && ' (Expired)'}
                                                    </span>
                                                )}
                                            </span>
                                        </div>

                                        {cert.credentialId && (
                                            <div className="text-muted-foreground">
                                                <span className="font-medium">Credential ID:</span> {cert.credentialId}
                                            </div>
                                        )}

                                        {cert.credentialUrl && (
                                            <a
                                                href={cert.credentialUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-1 text-primary hover:underline"
                                            >
                                                <ExternalLink className="h-3 w-3" />
                                                View Credential
                                            </a>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            )}

            {/* Add/Edit Dialog */}
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Add New Certification</DialogTitle>
                        <DialogDescription>
                            Add a professional certification or credential to your profile
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="name">Certification Name *</Label>
                                <Input
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="e.g., AWS Certified Solutions Architect"
                                    required
                                />
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="issuingOrganization">Issuing Organization *</Label>
                                <Input
                                    id="issuingOrganization"
                                    value={formData.issuingOrganization}
                                    onChange={(e) => setFormData({ ...formData, issuingOrganization: e.target.value })}
                                    placeholder="e.g., Amazon Web Services"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="issueDate">Issue Date *</Label>
                                <Input
                                    id="issueDate"
                                    type="date"
                                    value={formData.issueDate}
                                    onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="expiryDate">Expiry Date (Optional)</Label>
                                <Input
                                    id="expiryDate"
                                    type="date"
                                    value={formData.expiryDate}
                                    onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="credentialId">Credential ID (Optional)</Label>
                                <Input
                                    id="credentialId"
                                    value={formData.credentialId}
                                    onChange={(e) => setFormData({ ...formData, credentialId: e.target.value })}
                                    placeholder="e.g., ABC123XYZ"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="credentialUrl">Credential URL (Optional)</Label>
                                <Input
                                    id="credentialUrl"
                                    type="url"
                                    value={formData.credentialUrl}
                                    onChange={(e) => setFormData({ ...formData, credentialUrl: e.target.value })}
                                    placeholder="https://..."
                                />
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="description">Description (Optional)</Label>
                                <Textarea
                                    id="description"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Brief description of the certification..."
                                    rows={3}
                                />
                            </div>
                        </div>

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                                Cancel
                            </Button>
                            <Button className='text-foreground' type="submit" disabled={isCreating}>
                                {isCreating ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Adding...
                                    </>
                                ) : (
                                    'Add Certification'
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
            <ConfirmDialog
                isOpen={!!certToDelete}
                onClose={() => setCertToDelete(null)}
                onConfirm={() => {
                    if (!certToDelete) return;
                    deleteCert(certToDelete.id, {
                        onSuccess: () => {
                            setCertToDelete(null);
                            refetch();
                            toast.success('Certification deleted successfully');
                        },
                    });
                }}
                title="Delete certification?"
                description={`You are about to permanently delete “${certToDelete?.name || 'this certification'}”. This action cannot be undone.`}
                confirmText="Proceed with deletion"
                cancelText="Keep certification"
                variant="destructive"
            />
        </div>
    );
};

export default Certifications;
