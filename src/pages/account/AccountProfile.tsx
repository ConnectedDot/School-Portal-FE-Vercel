import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, ShieldCheck, UserRound } from 'lucide-react';
import { formatEnumLabel, formatFullName, getInitials } from '@/lib/data-parser';

export default function AccountProfile() {
    const { user } = useContext(AuthContext);
    const name = formatFullName(user || {});

    return (
        <div className="mx-auto max-w-4xl space-y-6">
            <div>
                <p className="text-sm font-semibold text-primary">My account</p>
                <h1 className="mt-1 text-3xl font-bold">Profile</h1>
                <p className="mt-2 text-sm text-muted-foreground">Your portal identity and available account information.</p>
            </div>
            <Card className="overflow-hidden border-0 bg-card shadow-xl">
                <div className="h-28 bg-gradient-to-r from-primary/25 via-card to-teal-400/15" />
                <CardContent className="-mt-12 px-6 pb-7 sm:px-8">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-end">
                        <Avatar className="h-24 w-24 border-4 border-card shadow-lg">
                            <AvatarImage src={user?.avatar} alt={name} />
                            <AvatarFallback className="bg-muted text-xl font-bold">{getInitials(name)}</AvatarFallback>
                        </Avatar>
                        <div className="pb-1">
                            <h2 className="text-2xl font-bold">{name}</h2>
                            <Badge className="mt-2 rounded-full" variant="secondary">{formatEnumLabel(user?.role)}</Badge>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
                <CardHeader><CardTitle className="flex items-center gap-2"><UserRound className="h-5 w-5 text-primary" /> Account details</CardTitle></CardHeader>
                <CardContent className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl bg-muted/45 p-4"><Mail className="mb-3 h-5 w-5 text-primary" /><p className="text-xs text-muted-foreground">Email address</p><p className="mt-1 break-all font-medium">{user?.email || 'Not provided'}</p></div>
                    <div className="rounded-2xl bg-muted/45 p-4"><Phone className="mb-3 h-5 w-5 text-teal-400" /><p className="text-xs text-muted-foreground">Phone number</p><p className="mt-1 font-medium">{user?.phone || 'Not provided'}</p></div>
                    <div className="rounded-2xl bg-muted/45 p-4 sm:col-span-2"><ShieldCheck className="mb-3 h-5 w-5 text-emerald-400" /><p className="text-xs text-muted-foreground">Account ID</p><p className="mt-1 break-all font-mono text-sm">{user?.id || 'Not available'}</p></div>
                </CardContent>
            </Card>
        </div>
    );
}
