import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import SignOut from "./signOut";
import { CustomUser } from "@/type";
import User from "@/models/user";
import UploadImage from "./uploadImage";
import Image from "next/image";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  const user = session.user as CustomUser;

  if (user.role?.toLocaleUpperCase() === "USER") {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-yellow-200 via-emerald-200 to-yellow-200">
        <div className="w-[40rem] h-[20rem] bg-blue-800 rounded-xl p-4 flex items-center justify-center gap-3 shadow-xl shadow-white relative">
          <div className="flex items-center justify-between gap-3 text-white">
            {session.user!.image ? (
              <Image
                width={128}
                height={128}
                src={session.user!.image}
                alt={session.user!.name ?? ""}
                className="rounded-full h-32 w-32 p-1 border-2 border-red-600 shadow-lg"
              />
            ) : (
              <UploadImage />
            )}
            <div className="w-auto">
              <h1 className="text-4xl font-bold mb-2">
                {session.user!.name === "admin"
                  ? "Hello, Admin!"
                  : "Hello, " + session.user!.name}
              </h1>
              <p className="text-xl font-bold">{session.user!.email}</p>
            </div>
          </div>
          <div className="absolute top-3 right-3">
            <SignOut />
          </div>
        </div>
      </div>
    );
  } else if (user.role?.toLocaleUpperCase() === "ADMIN") {
    const people = await User.find({});
    return (
      <>
        <section className="mx-auto w-full max-w-7xl px-4 py-4">
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div>
              <h2 className="text-lg font-semibold">Users</h2>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black transition-all duration-300"
              >
                Add new User
              </button>
              <SignOut />
            </div>
          </div>
          <div className="mt-6 flex flex-col">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr className="divide-x divide-gray-200">
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                        >
                          <span>User</span>
                        </th>

                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                        >
                          Status
                        </th>

                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                        >
                          Role
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {people.map((person) => (
                        <tr
                          key={person.email}
                          className="divide-x divide-gray-200"
                        >
                          <td className="whitespace-nowrap px-4 py-4">
                            <div className="flex items-center">
                              <div className="h-10 w-10 flex-shrink-0">
                                <Image
                                  width={40}
                                  height={40}
                                  className="h-10 w-10 rounded-full object-cover"
                                  src={person.avatar ?? "/images/avatar.png"}
                                  alt=""
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {person.name}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {person.email}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-4 py-4">
                            <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                              Active
                            </span>
                          </td>
                          <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
                            {person.role}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  } else {
    return (
      <div className="w-screen h-screen flex justify-center items-center flex-col bg-gradient-to-r from-violet-200 to-pink-200">
        {
          // Display user avatar
          session.user!.image && (
            <Image
              width={64}
              height={64}
              src={session.user!.image}
              alt={session.user!.name ?? ""}
              className="rounded-full h-16 w-16 mb-4"
            />
          )
        }
        <h1 className="text-4xl font-bold mb-4">
          {
            // Generate greeting message
            session.user!.name === "admin"
              ? "Hello, Admin!"
              : "Hello, " + session.user!.name
          }
        </h1>
        <SignOut />
      </div>
    );
  }
}
