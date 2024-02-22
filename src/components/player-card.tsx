'use client';

import { DownloadIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import { Button } from './ui/button';

export interface PlayerCard {
  uuid: string;
  displayName: string;
  smallArt: string;
  wideArl: string;
  largeArt: string;
}

export interface PlayerCardProps {
  playerCard: PlayerCard;
}

export default function PlayerCardComponent({ playerCard }: PlayerCardProps) {
  function download() {
    const src: string = playerCard.largeArt;
    const link = document.createElement('a');
    link.href = src;
    link.download = playerCard.displayName + '.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div className="w-64 group flex-none relative transition-transform transform hover:scale-105">
      <Button
        onClick={download}
        className="absolute w-full h-full bottom-0 p-2 bg-black/75 hidden group-hover:flex z-20 justify-center items-center transition-all rounded-md"
      >
        <DownloadIcon />
      </Button>
      <Image
        src={playerCard.largeArt}
        alt={playerCard.displayName}
        width={1000}
        height={1000}
        layout="responsive"
        className="w-64 rounded-md"
      />
    </div>
  );
}
