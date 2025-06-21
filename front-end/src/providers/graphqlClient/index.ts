import { GraphQLClient }from "graphql-request";
const isClient= typeof window !== 'undefined'
export const graphqlClient= new GraphQLClient("https://pearlpost-back.pearl99z.tech/graphql",{
  headers:()=>({
    Authorization: isClient? `Bearer ${window.localStorage.getItem("__Pearl_Token")}`:"",
  })
});