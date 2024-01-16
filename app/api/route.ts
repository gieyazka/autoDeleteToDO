import type { NextApiRequest, NextApiResponse } from 'next'

import { NextResponse } from "next/server";
import { User } from '@/type/common';
import axios from 'axios'

export async function GET(request: NextApiRequest) {
    try {
        const fetchData = await axios({
            method: "GET",
            url: "https://dummyjson.com/users?limit=0",
            validateStatus: function (status) {
                return status < 300; // Resolve only if the status code is less than 500
            }
        })
        if (fetchData.status === 200) {

            return NextResponse.json({ data: groupData(fetchData.data.users) }, { status: 200 });
        }

    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ data: error.message }, { status: 500 });
        }
        return NextResponse.json({ data: "An unknown error occurred." }, { status: 500 });
    }
}



const groupData = (users: User[]) => {
    const groupedData: { [x: string]: any } = {};

    users.forEach(user => {
        const department = user.company.department;

        if (!groupedData[department]) {
            groupedData[department] = {
                male: 0,
                female: 0,
                ageRange: "",
                hair: {},
                addressUser: {}
            };
        }

        user.gender === "male" ? groupedData[department].male++ : groupedData[department].female++;

        const userAge = user.age;
        const currentAgeRange = groupedData[department].ageRange;
        if (!currentAgeRange) {
            groupedData[department].ageRange = `${userAge}-${userAge}`;
        } else {
            const [minAge, maxAge] = currentAgeRange.split('-');
            groupedData[department].ageRange = `${Math.min(minAge, userAge)}-${Math.max(maxAge, userAge)}`;
        }

        const hairColor = user.hair.color;
        if (!groupedData[department].hair[hairColor]) {
            groupedData[department].hair[hairColor] = 1;
        } else {
            groupedData[department].hair[hairColor]++;
        }

        const fullName = `${user.firstName}${user.lastName}`;
        groupedData[department].addressUser[fullName] = user.address.postalCode;
    });

    return groupedData;
}
