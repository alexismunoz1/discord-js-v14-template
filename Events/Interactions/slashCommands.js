require("dotenv/config");
const { ChatInputCommandInteraction } = require("discord.js");

module.exports = {
  name: "interactionCreate",
  /**
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction, client) {
    if (interaction.isChatInputCommand()) {
      const command = client.commands.get(interaction.commandName);
      if (!command) {
        return interaction.reply({
          content: "This command is outdated.",
          ephemeral: true,
        });
      }

      if (command.developer && interaction.user.id !== process.env.USER_ID_ALE_FILADD) {
        return interaction.reply({
          content: "This command is only available to the developer",
          ephemeral: true,
        });
      }

      command.execute(interaction, client);
    } else if (interaction.isButton()) {
      const { buttons } = client;
      const { customId } = interaction;
      const button = buttons.get(customId);

      if (!button) return new Error("This button has no code");

      try {
        await button.execute(interaction, client);
      } catch (err) {
        console.log(err);
      }
    } else {
      return;
    }
  },
};
