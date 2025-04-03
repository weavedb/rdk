// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

import "../MultiOPRollup.sol";

interface VerifierDB {
  function verifyProof(uint[2] calldata _pA, uint[2][2] calldata _pB, uint[2] calldata _pC, uint[16] calldata _pubSignals) view external returns (bool);
}

contract MultiOPRU is MultiOPRollup {
  uint constant SIZE_PATH = 4;
  uint constant SIZE_VAL = 8;
  address public verifierDB;

  constructor (address _verifierRU, address _verifierDB, address _committer){
    verifierRU = _verifierRU;
    verifierDB = _verifierDB;
    committer = _committer;
  }
  
  function validateQuery(string memory txid, uint[] memory path, uint[] memory zkp) private view returns(uint[] memory){
    verify(zkp, VerifierDB.verifyProof.selector, verifierDB);
    return _validateQueryRU(txid, path, zkp, SIZE_PATH, SIZE_VAL);    
  }

  function qInt (string memory txid, uint[] memory path, uint[] memory zkp) public view returns (int) {
    uint[] memory value = validateQuery(txid, path, zkp);
    return _qInt(value);
  }

  function qFloat (string memory txid, uint[] memory path, uint[] memory zkp) public view returns (uint[3] memory) {
    uint[] memory value = validateQuery(txid, path, zkp);
    return _qFloat(value);
  }

  function qRaw (string memory txid, uint[] memory path, uint[] memory zkp) public view returns (uint[] memory) {
    uint[] memory value = validateQuery(txid, path, zkp);
    return _qRaw(value);
  }
  
  function qString (string memory txid, uint[] memory path, uint[] memory zkp) public view returns (string memory) {
    uint[] memory value = validateQuery(txid, path, zkp);
    return _qString(value);
  }

  function qBool (string memory txid, uint[] memory path, uint[] memory zkp) public view returns (bool) {
    uint[] memory value = validateQuery(txid, path, zkp);
    return _qBool(value);
  }
  
  function qNull (string memory txid, uint[] memory path, uint[] memory zkp) public view returns (bool) {
    uint[] memory value = validateQuery(txid, path, zkp);
    return _qNull(value);
  }

  function qCond (string memory txid, uint[] memory path, uint[] memory cond, uint[] memory zkp) public view returns (bool) {
    uint[] memory value = validateQuery(txid, path, zkp);
    return _qCond(value, cond);
  }

  function qCustom (string memory txid, uint[] memory path, uint[] memory path2, uint[] memory zkp) public view returns (int) {
    uint[] memory value = validateQuery(txid, path, zkp);
    return getInt(path2, value);
  }
  
}
