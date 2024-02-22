'use client';

import { ModeToggle } from '@/components/mode-toggle';
import PlayerCardComponent, { PlayerCard } from '@/components/player-card';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import {
  PlusCircledIcon,
  ResetIcon,
  TextAlignBottomIcon,
  TextAlignTopIcon,
} from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';

const url: any = 'https://valorant-api.com/v1/playercards';

export default function Home() {
  const defaultDataAmount: number = 16;

  const [data, setData] = useState<PlayerCard[]>([]);
  const [dataAmount, setDataAmount] = useState<number>(defaultDataAmount);
  const [sortedData, setSortedData] = useState<PlayerCard[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function fetchData(url: URL) {
      console.log(url);
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const jsonData = await response.json();
        setData(jsonData.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData(url);
  }, []);

  function sortAlphabetically() {
    const newData = [...data].sort((a, b) =>
      a.displayName.localeCompare(b.displayName)
    );
    setSortedData(newData);
  }

  function sortReverseAlphabetically() {
    const newData = [...data].sort((a, b) =>
      b.displayName.localeCompare(a.displayName)
    );
    setSortedData(newData);
  }

  function sortReset() {
    setDataAmount(defaultDataAmount);
    setSortedData([]);
  }

  const displayData = sortedData.length
    ? sortedData.slice(0, dataAmount)
    : data.slice(0, dataAmount);

  function loadData() {
    setDataAmount((prev) => prev + defaultDataAmount);
  }

  return (
    <div className="grid place-items-center w-screen h-screen pt-4">
      <ScrollArea className="w-5/6 lg:h-fit h-full whitespace-nowrap rounded-md border py-2">
        <div className="flex lg:flex-row flex-col justify-start items-center gap-4 p-6 overflow-auto">
          {displayData.map((item: PlayerCard) => (
            <PlayerCardComponent key={item.uuid} playerCard={item} />
          ))}
          {data.length > dataAmount && (
            <Button
              variant="outline"
              size="icon"
              onClick={loadData}
              className="rounded-full"
            >
              <PlusCircledIcon />
            </Button>
          )}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <div className="flex gap-2 p-8">
        <Button variant="outline" onClick={sortAlphabetically}>
          <TextAlignBottomIcon className="mr-2 h-4 w-4" />
          <p className="leading-7">A-z</p>
        </Button>
        <Button variant="outline" onClick={sortReverseAlphabetically}>
          <TextAlignTopIcon className="mr-2 h-4 w-4" />
          <p className="leading-7">Z-a</p>
        </Button>
        <Button
          className="flex-none"
          variant="destructive"
          size="icon"
          onClick={sortReset}
        >
          <ResetIcon className="h-4 w-4" />
        </Button>
        <hr className="h-9 w-px bg-muted mx-2" />
        <ModeToggle />
      </div>
    </div>
  );
}
