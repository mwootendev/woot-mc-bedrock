import { world, system, EquipmentSlot, Container, EntityInventoryComponent, ItemStack } from "@minecraft/server";

function mainTick() {
  if (system.currentTick % 100 === 0) {
    world.sendMessage("Hello starter! Tick: " + system.currentTick);
    const players = world.getAllPlayers();
    const player1 = players[0];

    // world.sendMessage("Player Properties: " + JSON.stringify(player1.getDynamicPropertyIds()));

    const player1Spawn = player1.getSpawnPoint();
    const playerInventory = player1.getComponent("inventory") as EntityInventoryComponent;

    // world.sendMessage("Player Inventory Str: " + JSON.stringify(playerInventory.additionalSlotsPerStrength));
    // world.sendMessage("Player Inventory Capacity: " + JSON.stringify(playerInventory.inventorySize));
    // world.sendMessage("Player Inventory Type: " + JSON.stringify(playerInventory.containerType));
    // world.sendMessage("Player Inventory Size: " + JSON.stringify(playerInventory.container?.size));
    const item1 = playerInventory.container?.getItem(0) as ItemStack;

    console.log("Player Inventory Item[0].type: " + JSON.stringify(item1?.type) + "\n");
    console.log("Player Inventory Item[0].components: " + JSON.stringify(item1?.getComponents()) + "\n");
    console.log("Player Inventory Item[0].properties: " + JSON.stringify(item1?.getDynamicPropertyIds()) + "\n");
    // console.log("Player Inventory Item[0].properties: " + JSON.stringify(Object.toString.apply(item1)) + "\n");
    console.log("Player Inventory Item[0].tagfs: " + JSON.stringify(item1?.getTags()) + "\n");
    // console.log("Player Inventory: " + JSON.stringify(playerInventory));

    console.log(JSON.stringify(item1));

    const dimension = world.getDimension(player1.dimension.id);

    // world.sendMessage("Player Dimension: " + JSON.stringify(dimension));

    const entities = dimension.getEntities();

    // world.sendMessage("Entities Components: " + JSON.stringify(player1.getComponents()));
    // world.sendMessage("Entities Tags: " + JSON.stringify(player1.getTags()));
  }

  system.run(mainTick);
}

world.afterEvents.itemUse.subscribe((itemUseEvent) => {
  console.log(itemUseEvent.itemStack.typeId);
  if (itemUseEvent.itemStack.typeId === "woot:homestone") {
    system.run(() => {
      const player = itemUseEvent.source;
      const playerSpawn = player.getSpawnPoint();
      if (playerSpawn?.dimension === player.dimension) {
        player.teleport({ x: playerSpawn.x, y: playerSpawn.y, z: playerSpawn.z });
        player.addExperience(player.getTotalXp() * -0.2);
      }
    });
    console.log("Homestone used by " + itemUseEvent.source.id);
  }
  console.log("Item after use event");
  console.log(JSON.stringify(itemUseEvent));
});
system.run(mainTick);
