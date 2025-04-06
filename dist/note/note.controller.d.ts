import { NoteService } from './note.service';
import { CreateNoteDTO, UpdateNoteDTO } from './note.schema';
export declare class NoteController {
    private noteService;
    constructor(noteService: NoteService);
    getNoteWeekly(plus: number, mines: number, accountId: string): Promise<{
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
    createNote(reqBody: CreateNoteDTO, accountId: string): Promise<{
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
    updateNote(reqBody: UpdateNoteDTO, date: string, accountId: string): Promise<{
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
