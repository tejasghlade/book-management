import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
export declare class BooksController {
    private readonly booksService;
    constructor(booksService: BooksService);
    create(createBookDto: CreateBookDto): Promise<import("./book.entity").Book>;
    findAll(page: number, limit: number, search: string): Promise<{
        data: import("./book.entity").Book[];
        count: number;
    }>;
    update(id: number, updateBookDto: UpdateBookDto): Promise<import("./book.entity").Book>;
    remove(id: number): Promise<void>;
}
