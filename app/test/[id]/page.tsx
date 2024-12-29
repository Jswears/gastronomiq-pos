'use client';

import TestTable from "@/components/Tables/TestTables";
import axios from "axios";
import { table } from "console";
import { useEffect, useState } from "react";
import { use } from "react";
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;



const TablesPage = ({ params }: { params: Promise<{ id: string }> }) => {
    const unwrappedParams = use(params); // Unwrap the params promise
    const id = unwrappedParams.id;
    const table_id = parseInt(id);

    return <TestTable tableId={table_id} />

};
export default TablesPage;
