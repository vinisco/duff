export class GetPlaylistResponse {
  beerStyle: string;
  playlist: {
    name: string;
    tracks: Track[];
  };
}

class Track {
  name: string;
  artist: string;
  link: string;
}
