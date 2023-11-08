// URL: http://localhost:3000/api/tasks

import prisma from  "@/lib/prismadb";
import { NextResponse } from "next/server";

export const POST = async (request) => {
    try {
        const accessToken = request.cookies.get('token').value;
        const body = await request.json();
        const { title, complete } = body;

        const newTask = await prisma.task.create({
            data: {
                title,
                complete,
                author: accessToken
            }
        });

        return NextResponse.json(newTask);

    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "POST Error", err }, { status: 500 });
    }
}

async function initiateNewbieTasks(accessToken) {
    const newbieTasks = [
        { title: 'Complete online JavaScript course', complete: true, author: accessToken },
        { title: 'Jog around the park 3x', complete: false, author: accessToken },
        { title: '10 minutes meditation', complete: false, author: accessToken },
        { title: 'Read for 1 hour', complete: false, author: accessToken },
        { title: 'Pick up groceries', complete: false, author: accessToken },
        { title: 'Complete Todo App on Frontend Mentor', complete: false, author: accessToken }
    ];

    await prisma.task.createMany({
        data: newbieTasks
    });
}

export const GET = async (request) => {
    try {
        const accessToken = request.cookies.get('token').value;

        const filterParam = request.nextUrl.searchParams.get("filter");
        let filter = handleFilter(filterParam, accessToken);

        let tasks = await prisma.task.findMany(
            filter
        );

        if (tasks.length === 0) {
            await initiateNewbieTasks(accessToken);
        }

        return NextResponse.json(tasks);

    } catch (err) {
        return NextResponse.json({ message: "GET Error", err }, { status: 500 });
    }
}

export const DELETE = async (request) => {
    try {
        const filterParam = request.nextUrl.searchParams.get("filter");
        let filter = handleFilter(filterParam);

        if (!filter) throw new Error("Bad filter");
        
        const deletedTasks = await prisma.task.deleteMany(
            filter
        );

        return NextResponse.json(`${deletedTasks.count} Tasks have been deleted`);

    } catch (err) {
        return NextResponse.json({ message: "DELETE Error", err }, { status: 500 });
    }
}

function handleFilter(filter, author) {
    switch (filter) {
        case "all":
            return {
                where: {
                    author
                }
            };
        case "completed":
            return {
                where: {
                    complete: true,
                    author
                }
            };
        case "active":
            return {
                where: {
                    complete: false,
                    author
                }
            };
        default:
            return null;
    }
}