import { useMemo, useState } from "react";
import { BookOpen, LibraryBig, Loader2, MapPin, Plus, Search, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCreateBook, useDeleteBook, useGetBooks, type Book } from "@/hooks/books";

const emptyBook = {
	title: "",
	author: "",
	isbn: "",
	category: "",
	location: "",
	description: "",
	quantity: 1,
};

const Library = () => {
	const [query, setQuery] = useState("");
	const [open, setOpen] = useState(false);
	const [form, setForm] = useState(emptyBook);
	const { data, isLoading, refetch } = useGetBooks();
	const { mutate: createBook, isPending: isCreating } = useCreateBook(async () => {
		setForm(emptyBook);
		setOpen(false);
		await refetch();
	});
	const { mutate: deleteBook } = useDeleteBook();

	const books = Array.isArray(data) ? data : [];
	const filteredBooks = useMemo(() => {
		const search = query.toLowerCase().trim();
		if (!search) return books;
		return books.filter((book) =>
			[book.title, book.author, book.category, book.isbn].some((value) =>
				String(value || "").toLowerCase().includes(search)
			)
		);
	}, [books, query]);

	const totalCopies = books.reduce((sum, book) => sum + Number(book.quantity || 0), 0);
	const availableCopies = books.reduce((sum, book) => sum + Number(book.availableQuantity ?? book.quantity ?? 0), 0);

	const handleCreate = () => {
		if (!form.title.trim() || !form.author.trim()) {
			toast.error("Title and author are required");
			return;
		}
		createBook(form);
	};

	const metrics = [
		{ label: "Books", value: books.length, detail: "catalogued titles" },
		{ label: "Copies", value: totalCopies, detail: "total inventory" },
		{ label: "Available", value: availableCopies, detail: "ready for checkout" },
	];

	return (
		<div className="space-y-6">
			<div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
				<div>
					<Badge className="rounded-full bg-brand-50 text-brand-700 hover:bg-brand-50 dark:bg-white/5 dark:text-brand-300">
						<LibraryBig className="mr-2 h-3.5 w-3.5" /> Library
					</Badge>
					<h1 className="mt-3 text-3xl font-black text-slate-950 dark:text-white">Library Catalog</h1>
					<p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
						Manage books exposed by the deployed `/book` endpoint.
					</p>
				</div>
				<Dialog open={open} onOpenChange={setOpen}>
					<DialogTrigger asChild>
						<Button className="gap-2 rounded-full">
							<Plus className="h-4 w-4" /> Add Book
						</Button>
					</DialogTrigger>
					<DialogContent className="rounded-3xl sm:max-w-2xl">
						<DialogHeader>
							<DialogTitle>Add library book</DialogTitle>
							<DialogDescription>Create a title in the school library catalog.</DialogDescription>
						</DialogHeader>
						<div className="grid gap-4 sm:grid-cols-2">
							<div className="space-y-2">
								<Label htmlFor="title">Title</Label>
								<Input id="title" value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} />
							</div>
							<div className="space-y-2">
								<Label htmlFor="author">Author</Label>
								<Input id="author" value={form.author} onChange={(event) => setForm({ ...form, author: event.target.value })} />
							</div>
							<div className="space-y-2">
								<Label htmlFor="isbn">ISBN</Label>
								<Input id="isbn" value={form.isbn} onChange={(event) => setForm({ ...form, isbn: event.target.value })} />
							</div>
							<div className="space-y-2">
								<Label htmlFor="category">Category</Label>
								<Input id="category" value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })} />
							</div>
							<div className="space-y-2">
								<Label htmlFor="location">Shelf location</Label>
								<Input id="location" value={form.location} onChange={(event) => setForm({ ...form, location: event.target.value })} />
							</div>
							<div className="space-y-2">
								<Label htmlFor="quantity">Quantity</Label>
								<Input id="quantity" type="number" min={1} value={form.quantity} onChange={(event) => setForm({ ...form, quantity: Number(event.target.value) })} />
							</div>
							<div className="space-y-2 sm:col-span-2">
								<Label htmlFor="description">Description</Label>
								<Textarea id="description" rows={3} value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} />
							</div>
						</div>
						<DialogFooter>
							<Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
							<Button onClick={handleCreate} disabled={isCreating}>
								{isCreating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
								Save Book
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>

			<div className="grid gap-4 sm:grid-cols-3">
				{metrics.map((metric) => (
					<Card key={metric.label} className="overflow-hidden rounded-3xl border-slate-200/80 bg-white/85 shadow-premium dark:border-white/10 dark:bg-white/[0.04]">
						<CardContent className="p-5">
							<p className="text-xs font-bold uppercase text-muted-foreground">{metric.label}</p>
							<p className="mt-3 text-3xl font-black">{metric.value}</p>
							<p className="mt-1 text-sm text-muted-foreground">{metric.detail}</p>
						</CardContent>
					</Card>
				))}
			</div>

			<Card className="rounded-3xl border-slate-200/80 bg-white/90 shadow-premium dark:border-white/10 dark:bg-white/[0.04]">
				<CardHeader className="gap-4 sm:flex-row sm:items-center sm:justify-between">
					<div>
						<CardTitle>Book Inventory</CardTitle>
						<CardDescription>Search, review, and remove catalog entries.</CardDescription>
					</div>
					<div className="relative w-full sm:max-w-xs">
						<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
						<Input className="rounded-full pl-9" placeholder="Search books..." value={query} onChange={(event) => setQuery(event.target.value)} />
					</div>
				</CardHeader>
				<CardContent>
					{isLoading ? (
						<div className="flex h-48 items-center justify-center text-muted-foreground">
							<Loader2 className="mr-2 h-5 w-5 animate-spin" /> Loading catalog...
						</div>
					) : (
						<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
							{filteredBooks.map((book: Book) => (
								<div key={book.id} className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 transition hover:-translate-y-0.5 hover:border-brand-200 hover:bg-white dark:border-white/10 dark:bg-white/[0.03] dark:hover:bg-white/[0.06]">
									<div className="flex items-start justify-between gap-3">
										<div className="flex gap-3">
											<div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-300">
												<BookOpen className="h-5 w-5" />
											</div>
											<div>
												<h3 className="font-black leading-tight">{book.title}</h3>
												<p className="mt-1 text-sm text-muted-foreground">{book.author}</p>
											</div>
										</div>
										<Button variant="ghost" size="icon" className="h-9 w-9 rounded-full text-destructive" onClick={() => deleteBook(book.id, { onSuccess: () => refetch() })}>
											<Trash2 className="h-4 w-4" />
										</Button>
									</div>
									<div className="mt-4 flex flex-wrap gap-2">
										<Badge variant="secondary">{book.category || "General"}</Badge>
										<Badge variant="outline">{book.availableQuantity ?? book.quantity ?? 0} available</Badge>
									</div>
									{book.location && (
										<p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
											<MapPin className="h-3.5 w-3.5" /> {book.location}
										</p>
									)}
								</div>
							))}
							{filteredBooks.length === 0 && (
								<div className="col-span-full rounded-2xl border border-dashed p-10 text-center text-muted-foreground">
									No books match your search.
								</div>
							)}
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
};

export default Library;
