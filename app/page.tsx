"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

export interface Badge {
  title: string;
  points: number;
  type: string;
  date: string;
  badgeId: number;
}

export interface User {
  avatar: string;
  badges: Badge[];
  milestone: number;
  name: string;
  points: {
    arcade: number;
    bonus: number;
    total: number;
  };
  totalBadges: {
    games: number;
    trivias: number;
    skillBadges: number;
  };
  url: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updatedAt: any;
}

export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [profile, setProfile] = useState("");

  useEffect(() => {
    async function fetchUser() {
      if (profile) {
        setIsLoading(true);
        setUser(null);
        const res = await fetch(
          `https://arcade-points-topaz.vercel.app/api?url=${profile}`
        );
        const { data } = await res.json();
        setUser(data);
        setIsLoading(false);
      }
    }
    fetchUser();
  }, [profile]);

  function handleClick() {
    if (inputRef.current) {
      const value = inputRef.current.value;
      setProfile(value);
    }
  }

  return (
    <div className="w-[600px] max-w-full p-5 my-5 mx-auto flex flex-col gap-3">
      <h1 className="text-[22px] font-bold text-center">
        Calculadora Google Cloud Arcade Latam Matza
      </h1>
      <Card>
        <CardContent className="flex p-5">
          <Input ref={inputRef} />
          <Button onClick={handleClick}>Calcular</Button>
        </CardContent>
      </Card>
      {isLoading && <Skeleton className="h-[415px] w-full rounded-xl" />}
      {user && (
        <Card>
          <CardHeader className="flex flex-row items-center space-x-4 pb-0">
            <Avatar className="h-12 w-12">
              {user.avatar ? (
                <AvatarImage src={user.avatar} alt="Avatar" />
              ) : (
                <AvatarImage src="/no_avatar.png" alt="Avatar" />
              )}
            </Avatar>
            <CardTitle>{user.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <Table className="max-w-full px-3 w-[600px]">
              <TableHeader>
                <TableRow>
                  <TableHead>Badges</TableHead>
                  <TableHead>Quantidade</TableHead>
                  <TableHead>Pontos</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Games</TableCell>
                  <TableCell>{user.totalBadges.games}</TableCell>
                  <TableCell>
                    {user.badges.reduce(
                      (sum, badge) =>
                        badge.type === "game" ? sum + badge.points : sum,
                      0
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Trívias</TableCell>
                  <TableCell>{user.totalBadges.trivias}</TableCell>
                  <TableCell>
                    {user.badges.reduce(
                      (sum, badge) =>
                        badge.type === "trivia" ? sum + badge.points : sum,
                      0
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Skill Badges</TableCell>
                  <TableCell>{user.totalBadges.skillBadges}</TableCell>
                  <TableCell>
                    {Math.floor(
                      user.badges.reduce(
                        (sum, badge) =>
                          badge.type === "skill" ? sum + badge.points : sum,
                        0
                      )
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Bonus Latam</TableCell>
                  <TableCell></TableCell>
                  <TableCell>{user.points.bonus}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    <strong>Total</strong>
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell>
                    <strong>{user.points.total}</strong>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            {user.milestone > 0 && (
              <>
                <h2 className="text-[16px] font-bold text-center mb-[12px]">
                  Você atingiu o milestone {user.milestone}! Parabéns!!!
                </h2>
                <Image
                  alt="milestone prize"
                  src={"/milestone" + user.milestone + ".png"}
                  className="mx-auto my-3"
                />
              </>
            )}
            {user.milestone < 4 && (
              <>
                <h3 className="font-bold">Para o próximo milestone faltam: </h3>
                <p>
                  {user.milestone < 3
                    ? (user.milestone + 1) * 15 - user.points.total
                    : 65 - user.points.total}{" "}
                  arcade points
                </p>
              </>
            )}
            {user.milestone < 3 && (
              <>
                <h3 className="font-bold">Para o próximo bonus faltam: </h3>
                <ul>
                  {user.milestone + 1 > user.totalBadges.games && (
                    <li>{user.milestone + 1 - user.totalBadges.games} Games</li>
                  )}
                  {user.milestone + 1 > user.totalBadges.trivias && (
                    <li>
                      {user.milestone + 1 - user.totalBadges.trivias} Trívias
                    </li>
                  )}
                  {(user.milestone + 1) * 6 > user.totalBadges.skillBadges && (
                    <li>
                      {(user.milestone + 1) * 6 - user.totalBadges.skillBadges}{" "}
                      Skill Badges
                    </li>
                  )}
                </ul>
              </>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
