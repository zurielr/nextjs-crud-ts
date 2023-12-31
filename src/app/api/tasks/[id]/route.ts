import { NextResponse } from "next/server";
import { prisma } from "@/app/libs/prisma";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const task = await prisma.task.findFirst({
        where: {
            id: Number(params.id),
        },
    });
    return NextResponse.json(task);
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const data = await request.json();
    const taskUpdated = await prisma.task.update({
        where: {
            id: Number(params.id),
        },
        data: data,
    });
    return NextResponse.json(taskUpdated);
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const task = await prisma.task.delete({
        where: {
            id: Number(params.id),
        },
    });
    return NextResponse.json(task);
}