export class SongForm {
    song: any;
    constructor(
        title: any,
        artist: any,
        year: any,
        song: any,
        type: any
    ) {
        this.song = song;
    }

    setSong(file) {
        return this.song = file;
    }
}
