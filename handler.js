module.exports.people = async event => {
  return {
    ok: true,
    data: [
      {id: 1, name: 'John Doe', role: 'Developer'},
      {id: 2, name: 'Jane Doe', role: 'CTO'},
    ],
    event
  };
};
