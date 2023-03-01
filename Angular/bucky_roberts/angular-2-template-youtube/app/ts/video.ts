export class Video {
  id: number;
  title: string;
  videoUrl: string;
  desc: string;

  constructor(id: number, title: string, videoUrl: string, desc: string) {
    this.id = id;
    this.title = title;
    this.videoUrl = videoUrl;
    this.desc = desc;
  }
}