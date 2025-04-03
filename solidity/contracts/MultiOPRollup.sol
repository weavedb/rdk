// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;
import "./MultiZKRollup.sol";


contract MultiOPRollup is MultiZKRollup {
  
  function commitRoot (string memory txid, uint _root) public returns (uint) {
    require(msg.sender == committer, "sender is not committer");
    roots[txid] = _root;
    return roots[txid];
  }
}
