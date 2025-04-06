import { PrismaService } from 'src/common/prisma.service';
import { CreateNoteDTO, UpdateNoteDTO } from './note.schema';
export declare class NoteService {
    private prismaService;
    constructor(prismaService: PrismaService);
    createNote(accountId: string, data: CreateNoteDTO): Promise<{
        success: boolean;
        message: string;
        data: any;
        page: any;
    } | {
        success: boolean;
        message: string;
        data: any;
        page?: undefined;
    }>;
    getNoteByDate(date: string, accountId: string): Promise<{
        success: boolean;
        message: string;
        data: any;
        page: any;
    } | {
        success: boolean;
        message: string;
        data: any;
        page?: undefined;
    }>;
    getWeeklyNoteByDate(accountId: string, plus: number, mines: number): Promise<{
        success: boolean;
        message: string;
        data: any;
        page: any;
    } | {
        success: boolean;
        message: string;
        data: any;
        page?: undefined;
    }>;
    updateNote(date: string, accountId: string, { label, text, files }: UpdateNoteDTO): Promise<{
        success: boolean;
        message: string;
        data: any;
        page: any;
    } | {
        success: boolean;
        message: string;
        data: any;
        page?: undefined;
    }>;
}
