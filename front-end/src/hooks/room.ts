import {  useQuery } from "@tanstack/react-query"
import { GetAllRoomsQuery, GetAllRoomsQueryVariables, GetRoomsByIdQuery } from "../../gql/graphql";
import { graphqlClient } from "@/providers/graphqlClient/index";
import { getAllRoomsQuery, getRoomsByIdQuery } from "../../graphql/query/room";

export const useGetRooms = () => {
 const query = useQuery<GetAllRoomsQuery,GetAllRoomsQueryVariables>({
  queryKey: ["all-Rooms"],
  queryFn: async (): Promise<GetAllRoomsQuery> => {
    const data = await graphqlClient.request<GetAllRoomsQuery>(getAllRoomsQuery as any);
    return data;
  }
 });
 return {...query,rooms:query.data?.getAllRooms,isLoading3:query.isLoading}
}

export const useGetRoomsById = () => {
  const query = useQuery<GetRoomsByIdQuery, unknown, GetRoomsByIdQuery, ["all-Rooms"]>({
    queryKey: ["all-Rooms"],
    queryFn: async (): Promise<GetRoomsByIdQuery> => {
      const data = await graphqlClient.request<GetRoomsByIdQuery>(getRoomsByIdQuery as any);
      return data;
    }
  });
  return {...query,rooms:query.data?.getRoomsById,isLoading4:query.isLoading}
}