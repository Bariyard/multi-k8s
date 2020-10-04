const { GraphQLServer } = require("graphql-yoga");
const { PrismaClient } = require("@prisma/client");



// let links = [
//   {
//     id: "link-0",
//     url: "www.howtographql.com",
//     description: "Fullstack tutorial for GraphQL",
//   },
// ];

// let idCounts = links.length;


// const typeDefs = `
//   type Query {
//     hello(name: String): String!
//   }
// `

// const resolvers = {
//   Query: {
//     hello: 'hello',
//   },
// }

const value = [
  {number: 1},
  {number: 2},
  {number: 3},
]

const resolvers = {
  Query: {
    // info: () => `this is a test API for GraphQL - Tutorial`,
    // feed: (parents, args, context) => context.prisma.Link.findMany(),
    // link: (parent, args) => {
    //   return links.find((data) => data.id == args.id);
    // },
    values: (parent, args ) =>{
      return 'madadfaqga'
    }
  },
  Mutation: {
    // post: (parent, args, context) => {
    //   const newLink = context.prisma.Link.create({
    //     data: { description: args.description, url: args.url },
    //   });
    //   return newLink;
    // },

    // updateLink: (parent, args) => {
    //   let updateLink = links.find((data) => data.id == args.id);
    //   let updateLinkIndex = links.findIndex((data) => data.id == args.id);
    //   updateLink.url = args.url;
    //   updateLink.deq = args.description;

    //   links[updateLinkIndex] = updateLink;
    //   return updateLink;
    // },

    // deleteLink: (parent, args) => {
    //   let updateLinkIndex = links.findIndex((data) => data.id == args.id);
    //   links.splice(updateLinkIndex);
    //   return links;
    // },
  },
  Link: {
    id: (parent) => parent.id,
    description: (parent) => parent.description,
    url: (parent) => parent.url,
  },
};

const prisma = new PrismaClient();

const server = new GraphQLServer({
  typeDefs: "./src/schemal.graphql",
  resolvers,
  context: {
    prisma,
  },
});

server.start(() => console.log(`graphql-server is running on http://localhost:4000`));
