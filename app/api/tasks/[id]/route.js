// URL: http://localhost:3000/api/tasks/12345

import prisma from  "@/lib/prismadb"
import { NextResponse } from "next/server"

export async function GET(request, { params }) {
    try {
        const accessToken = request.cookies.get('token').value;

        const { id } = params;

        const task = await prisma.task.findUnique({
            where: {
                id,
                author: accessToken
            }
        });

        if (!task) {
            return NextResponse.json(
                { message: "Task not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(task);

    } catch (err) {
        return NextResponse.json({ message: "GET Error", err }, { status: 500 });
    }
}

export async function PATCH(request, { params }) {
    try {
        const accessToken = request.cookies.get('token').value;

        const body = await request.json();
        const { title, complete } = body;
        
        const { id } = params;

        const updateTask = await prisma.task.update({
            where: {
                id,
                author: accessToken
            },
            data: {
                title,
                complete
            }
        });

        if (!updateTask) {
            return NextResponse.json(
                { message: "Task not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(updateTask);

    } catch (err) {
        return NextResponse.json({ message: "UPDATE Error", err }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        const accessToken = request.cookies.get('token').value;

        const { id } = params;

        const task = await prisma.task.delete({
            where: {
                id,
                author: accessToken
            }
        });

        return NextResponse.json("Post has been deleted");

    } catch (err) {
        return NextResponse.json({ message: "DELETE Error", err }, { status: 500 });
    }
}