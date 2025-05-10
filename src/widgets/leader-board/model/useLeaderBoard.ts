import { create } from "zustand";
import { requester } from "../../../shared/api/axios";
import type { LeaderBoardDto } from "../../../shared/utils/types";

interface State {
 data: LeaderBoardDto[],
 fetchData: () => void
}
export const useLeaderBoard = create<State>((set) => ({
  data: [] as LeaderBoardDto[],
  fetchData: async() => {
    try{
      const {data} = await requester.get('score/top-players');
      console.log('My data ' + data);
      set({data: data.data})
    }catch(e){
      return Promise.reject(e);
    }
  }
}))