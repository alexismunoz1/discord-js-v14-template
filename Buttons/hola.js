module.exports = {
  data: {
    name: "hola",
  },
  async execute(interaction, client) {
    await interaction.reply({ content: "Hola a todos" });
  },
};
