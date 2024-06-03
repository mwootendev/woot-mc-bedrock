import { world, system, EquipmentSlot, Container, EntityInventoryComponent, ItemStack } from "@minecraft/server";

function mainTick() {
  if (system.currentTick % 100 === 0) {
    world.sendMessage("Hello starter! Tick: " + system.currentTick);   
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
