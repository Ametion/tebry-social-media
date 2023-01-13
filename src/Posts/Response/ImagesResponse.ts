export class ImagesResponse {
    public readonly imageId: number;
    public readonly image: string;

    constructor(imageId: number, image: string) {
        this.imageId = imageId;
        this.image = image;
    }
}