const Item = require("../models").Item;
const ItemModes = require("../models").ItemModes;
const ItemTypes = require("../models").ItemTypes;
const Category = require("../models").Category;
const Types = require("../models").Type;

function filterArrays(arr1, arr2) {
  const modeIdSet = new Set(arr1.map((item) => item.modeId));
  const result = arr2.filter((item) => !modeIdSet.has(item.id));

  return result;
}

function filterArraysType(arr1, arr2) {
  const modeIdSet = new Set(arr1.map((item) => item.typeId));
  const result = arr2.filter((item) => !modeIdSet.has(item.id));

  return result;
}
async function filtedModes(p2) {
  const data = await ItemModes.findAll({
    where: { p2 },
    include: [
      {
        model: Category,
      },
    ],
  });
  const country = await Category.findAll();
  const newCategories = await filterArrays(data, country);

  return { data, newCategories };
}

async function filtedTypes(p2) {
  const data = await ItemTypes.findAll({
    where: { p2 },
    include: [
      {
        model: Types,
      },
    ],
  });
  const country = await Types.findAll();
  const newCategories = await filterArraysType(data, country);

  return { data, newCategories };
}

function mergeByModeId(arr) {
  const result = [];

  const mergedObjects = {};

  arr.forEach((item) => {
    const { id, modeId, price, Category } = item;

    if (!mergedObjects[modeId]) {
      mergedObjects[modeId] = {
        id,
        modeId,
        price,
        Category,
      };
    } else {
      mergedObjects[modeId].id = id;
      mergedObjects[modeId].Category = Category;
    }
  });

  for (const key in mergedObjects) {
    if (mergedObjects.hasOwnProperty(key)) {
      result.push(mergedObjects[key]);
    }
  }

  return result;
}

function mergeByTypeId(arr) {
  const result = [];

  const mergedObjects = {};

  arr.forEach((item) => {
    const { id, typeId, price, Type } = item;

    if (!mergedObjects[typeId]) {
      mergedObjects[typeId] = {
        id,
        typeId,
        price,
        Type,
      };
    } else {
      mergedObjects[typeId].id = id;
      mergedObjects[typeId].Type = Type;
    }
  });

  for (const key in mergedObjects) {
    if (mergedObjects.hasOwnProperty(key)) {
      result.push(mergedObjects[key]);
    }
  }

  return result;
}

module.exports = {
  filtedModes,
  filtedTypes,
  mergeByModeId,
  mergeByTypeId
};
