export class SongForm {
    title: string;
    artist: string;
    year: string;
    file: File;
    type: string;

    constructor(
        title?: any,
        artist?: any,
        year?: any,
        file?: any,
        type?: any
    ) {
        this.title = title;
        this.artist = artist;
        this.year = year;
        this.file = file;
        this.type = type;
    }
}
