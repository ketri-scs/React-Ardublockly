import * as Blockly from "blockly/core";

// 2024.09.17 : SCS
import 'blockly/python'; // 필요 시 추가

/**
 * Code generator to add code into the setup() and loop() functions.
 * Its use is not mandatory, but necessary to add manual code to setup().
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */



Blockly.Arduino["arduino_functions"] = function (block) {
  var board = window.sessionStorage.getItem("board");

  if (board === "mcu" || board === "mini") {
  Blockly.Arduino.libraries_["library_senseBoxIO"] = "#include <senseBoxIO.h>";
  }
  // Edited version of Blockly.Generator.prototype.statementToCode
  function statementToCodeNoTab(block, name) {
    var targetBlock = block.getInputTargetBlock(name);
    var code = Blockly.Arduino.blockToCode(targetBlock);
    if (typeof code != "string") {
      throw new Error(
        'Expecting code from statement block "' + targetBlock.type + '".'
      );
    }
    return code;
  }

  var setupBranch = Blockly.Arduino.statementToCode(block, "SETUP_FUNC");
  // //var setupCode = Blockly.Arduino.scrub_(block, setupBranch); No comment block
  if (setupBranch) {
    Blockly.Arduino.setupCode_["mainsetup"] = setupBranch;
  }

  var loopBranch = statementToCodeNoTab(block, "LOOP_FUNC");
  //var loopcode = Blockly.Arduino.scrub_(block, loopBranch); No comment block
  return loopBranch;
};

// 2024.09.17 : SCS
Blockly.Python["arduino_functions"] = function (block) {
  var board = window.sessionStorage.getItem("board");

  if (board === "mcu" || board === "mini") {
    Blockly.Python.definitions_['import_senseBoxIO'] = 'import senseBoxIO';
  }
  
  // Edited version of Blockly.Generator.prototype.statementToCode
  function statementToCodeNoTab(block, name) {
    var targetBlock = block.getInputTargetBlock(name);
    var code = Blockly.Python.blockToCode(targetBlock); // Blockly.Python 사용
    if (typeof code != "string") {
      throw new Error(
        'Expecting code from statement block "' + targetBlock.type + '".'
      );
    }
    return code;
  }

  var setupBranch = Blockly.Python.statementToCode(block, "SETUP_FUNC");
  if (setupBranch) {
    Blockly.Python.setups_["mainsetup"] = setupBranch;
  }

  var loopBranch = statementToCodeNoTab(block, "LOOP_FUNC");
  return loopBranch;
};

Blockly.Arduino["procedures_defreturn"] = function (block) {
  // Define a procedure with a return value.
  const funcName = Blockly.Arduino.nameDB_.getName(
    block.getFieldValue("NAME"),
    Blockly.Procedures.NAME_TYPE
  );
  const branch = Blockly.Arduino.statementToCode(block, "STACK");
  const returnType = block.getFieldValue("RETURN TYPE") || "void";

  let returnValue =
    Blockly.Arduino.valueToCode(block, "RETURN", Blockly.Arduino.ORDER_NONE) ||
    "";
  if (returnValue) {
    returnValue = Blockly.Arduino.INDENT + "return " + returnValue + ";\n";
  }
  const args = [];
  for (let i = 0; i < block.argumentVarModels_.length; i++) {
    args[i] =
      translateType(block.argumentVarModels_[i].type) +
      " " +
      block.argumentVarModels_[i].name;
  }
  let code =
    translateType(returnType) +
    " " +
    funcName +
    "(" +
    args.join(", ") +
    ") {\n" +
    branch +
    returnValue +
    "}";
  code = Blockly.Arduino.scrub_(block, code);
  // Add % so as not to collide with helper functions in definitions list.
  Blockly.Arduino.functionNames_["%" + funcName] = code;
  return null;
};

function translateType(type) {
  switch (type) {
    case "int":
      return "int";
    case "String":
      return "String";
    case "void":
      return "void";
    case "boolean":
      return "boolean";
    case "float":
      return "float";
    default:
      throw new Error("Invalid Parameter Type");
  }
}

Blockly.Arduino["procedures_defnoreturn"] =
  Blockly.Arduino["procedures_defreturn"];

Blockly.Arduino["procedures_callreturn"] = function (block) {
  // Call a procedure with a return value.
  const funcName = Blockly.Arduino.nameDB_.getName(
    block.getFieldValue("NAME"),
    Blockly.Procedures.NAME_TYPE
  );
  const args = [];
  for (let i = 0; i < block.arguments_.length; i++) {
    args[i] =
      Blockly.Arduino.valueToCode(
        block,
        "ARG" + i,
        Blockly.Arduino.ORDER_COMMA
      ) || "null";
  }
  const code = funcName + "(" + args.join(", ") + ")";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino["procedures_callnoreturn"] = function (block) {
  // Call a procedure with no return value.
  const funcName = Blockly.Arduino.nameDB_.getName(
    block.getFieldValue("NAME"),
    Blockly.Procedures.NAME_TYPE
  );
  const args = [];
  for (let i = 0; i < block.arguments_.length; i++) {
    args[i] =
      Blockly.Arduino.valueToCode(
        block,
        "ARG" + i,
        Blockly.Arduino.ORDER_COMMA
      ) || "null";
  }

  return funcName + "(" + args.join(", ") + ");\n";
};
