import User, { IUser } from '@/model/User';
import { connectDB } from '@/config/mongoConnect';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const { name, contact, address, category, otherTalent, district, state } = await req.json();
    console.log("name, contact, address, category, otherTalent:", name, contact, address, category, otherTalent);

    if (!name || !contact || !address || !category || !state || !district) {
        return new NextResponse(JSON.stringify({ message: 'Name, contact, address, and category are required' }), {
            status: 400
        })
    }

    try {
        await connectDB();

        // Check if a user with the same name and contact exists
        const existingUser = await User.findOne({ contact });
        console.log("existingUser: ", existingUser);

        if (existingUser) {
            return new NextResponse(JSON.stringify({ message: 'User with the same contact already exists' }), {
                status: 409
            })
        }

        // Create a new user
        const newUser: IUser = new User({
            name,
            contact,
            address,
            category,
            otherTalent,
            district,
            state
        });

        await newUser.save(); // Save the user to the database

        return new NextResponse(JSON.stringify({ message: 'Registered succesfully', user: newUser }), {
            status: 201,
        })
    } catch (error) {
        console.log(error);
        return new NextResponse(JSON.stringify({ message: 'Internal server error' }), {
            status: 505
        })
    }
}
