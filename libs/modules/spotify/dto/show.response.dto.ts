export class ShowResponseDto {
  name: string;
  tracks: {
    items: Item[];
  };
}

class Item {
  track: Track;
}

class Track {
  name: string;
  external_urls: {
    spotify: string;
  };

  artists: [
    {
      name: string;
    },
  ];
}
