import {
  BaseRecord,
  DataProvider,
  GetListParams,
  GetListResponse,
} from "@refinedev/core";
import { Subject } from "@/types";

const MOCK_SUBJECTS: Subject[] = [
  {
    id: 1,
    code: "CSE101",
    name: "Introduction to Computer Science",
    department: "Computer Science",
    description: "Foundational concepts in programming, algorithms, and computing systems.",
    created_at: "2026-03-02T00:00:00.000Z",
  },
  {
    id: 2,
    code: "EEE210",
    name: "Circuit Analysis",
    department: "Electrical Engineering",
    description: "Principles of DC/AC circuits, network theorems, and practical analysis methods.",
    created_at: "2026-03-02T00:00:00.000Z",
  },
  {
    id: 3,
    code: "MEC230",
    name: "Thermodynamics",
    department: "Mechanical Engineering",
    description: "Study of energy, heat transfer, and laws governing thermodynamic systems.",
    created_at: "2026-03-02T00:00:00.000Z",
  },
];

export const dataProvider: DataProvider = {
  getList: async <TData extends BaseRecord = BaseRecord>({
    resource,
  }: GetListParams): Promise<GetListResponse<TData>> => {
      if(resource !== "subjects") {
        return { data: [] as TData[], total: 0 };
      }

      return {
        data: MOCK_SUBJECTS as unknown as TData[],
        total: MOCK_SUBJECTS.length,
      };
    },
    getOne: async () => {throw new Error('This function is not implemented')},
    create: async () => {throw new Error('This function is not implemented')},
    update: async () => {throw new Error('This function is not implemented')},
    deleteOne: async () => {throw new Error('This function is not implemented')},

    getApiUrl:() => "",
}