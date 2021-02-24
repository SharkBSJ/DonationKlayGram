pragma solidity ^0.5.6;


contract DonationKlaygram {
    uint256 public count;
    uint256 public totalCost;
    address public owner;
    
    constructor() public {
        count = 0;
        totalCost = 0;
        owner = msg.sender;
    }

    event Donated (uint256 indexed tokenId, address owner, string description, uint256 amount, uint256 timestamp);

    mapping (uint256 => DonationData) private _donationList;

    struct DonationData {
        uint256 tokenId;                       // Unique token id
        address owner;                         // Address of owner of transaction
        string description;                    // Short description about the donation
        uint256 amount;                        // Amount of donation
        uint256 timestamp;                     // Uploaded time
    }

  /**
   * @notice _mint() is from ERC721.sol
   */
    function makeDonation(string memory description) payable public returns(bool) {
        uint256 amount = msg.value;
        require(amount >= 100000000000000000);
        
        uint256 tokenId = count + 1;
        count = count + 1;
        totalCost = totalCost + amount;

        DonationData memory newDonationData = DonationData({
            tokenId : tokenId,
            owner : msg.sender, 
            amount : amount, 
            description : description,
            timestamp : now
        });

        _donationList[tokenId] = newDonationData;

        emit Donated(tokenId, msg.sender, description, amount, now);
        address(uint160(owner)).transfer(amount);
        return true;
    }
        
    function getCount () public view returns (uint) {
        return count;
    }

    function getDonation (uint tokenId) public view
    returns(uint256, address, string memory, uint256, uint256) {
        require(_donationList[tokenId].tokenId != 0, "Donation does not exist");
        return (
            _donationList[tokenId].tokenId,
            _donationList[tokenId].owner,
            _donationList[tokenId].description,
            _donationList[tokenId].amount, 
            _donationList[tokenId].timestamp);
    }
    
    function getTotalCost() public view returns (uint) {
        return totalCost;
    }
}
