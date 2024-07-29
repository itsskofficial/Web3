// SPDX-License-Identifier: MIT
pragma solidity >=0.6.12 <0.9.0;

interface IERC20 {
    function transfer(address recipient, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns(uint256);
    function symbol() external view returns (string memory);
    function totalSupply() external view returns (uint256);
    function name() external view returns (string memory);
}

contract ICOMarketplace {
    struct TokenDetails {
        address tokenAddress;
        bool supported;
        uint256 price;
        address creator;
        string name;
        string symbol;
    }

    mapping (address => TokenDetails) public tokens;
    address[] public supportedTokens;
    address public owner;

    event TokenReceived(address indexed tokenAddress, address indexed from, uint256 amount);
    event TokenTransferred(address indexed tokenAddress, address indexed from, uint256 amount);
    event TokenWithdrawed(address indexed tokenAddress, address indexed from, uint256 amount);
    event TokenAdded(address indexed tokenAddress, uint256 price, address indexed creator, string name, string symbol);

    modifier supportedToken(address tokenAddress){
        require(tokens[tokenAddress].supported, "Token not supported");
        _;
    }

    modifier onlyOwner(){
        require(msg.sender == owner, "Caller is not the owner");
        _;
    }

    modifier onlyCreator(address tokenAddress){
        require(msg.sender == tokens[tokenAddress].creator, "Caller is not the tokenAddress creator");
        _;
    }

    receive() external payable{
        revert("Contract does not accept Ether directly");
    }

    constructor(){
        owner = msg.sender;
    }

    function createICOSale(address tokenAddress, uint256 price) external {
        IERC20 token = IERC20(tokenAddress);
        string memory tokenName = token.name();
        string memory tokenSymbol = token.symbol();

        tokens[tokenAddress] = TokenDetails({
            tokenAddress: tokenAddress,
            supported: true,
            price: price,
            name: tokenName,
            symbol: tokenSymbol
        })

        supportedTokens.push(tokenAddress);
        emit TokenAdded(tokenAddress, price, msg.sender, tokenName, tokenSymbol);
    }

    function multiply(uint256, x, uint256 y) internal pure returns (uint256 z){
        require(y == 0 || (z = x * y) / y == x);
    }

    function buyToken(address tokenAddress, uint256 amount) external payable supportedToken(tokenAddress) {
        require(amount > 0, "Amount must be greater than 0");

        TokenDetails memory tokenDetails = tokens[tokenAddress];
        uint256 totalCost = multiply(tokenDetails.price, amount);
        require(msg.value == totalCost, "Incorrect Ether amount sent");

        (bool sent, ) = tokenDetails.creator.call{value: msg.value}("");
        require(sent, "Failed to transfer Ether to token creator");

        IERC20 token = IERC20(tokenAddress);
        require(token.transfer(msg.sender, amount * 10 ** 18), "Transfer failed");

        emit TokenTransferred(tokenAddress, msg.sender, amount);
    }

    function getBalance(address tokenAddress) external view returns (uint256) {
        require(tokens[tokenAddress].supported, "Token not supported");

        IERC20 token = IERC20(tokenAddress);
        return token.balanceOf(address(this));
    }

    function getSupportedTokens() external view returns (address[] memory) {
        return supportedTokens;
    }

    function withdrawToken(address tokenAddress, uint256 amount) external onlyCreator(tokenAddress) supportedToken(tokenAddress) {
        require(amount > 0, "Amount must be greater than 0");

        IERC20 token = IERC20(tokenAddress);
        uint256 balance = token.balanceOf(address(this));

        require(balance >= amount, "Insufficient token balance");
        require(token.transfer(msg.sender, amount), "Token transfer failed");

        emit TokenWithdrawed(tokenAddress, msg.sender, amount);
    }

    function getTokenDetails(address tokenAddress) external view returns (TokenDetails memory) {
        require(tokens[tokenAddress].supported, "Token not supported");

        return tokens[tokenAddress];
    }

    function getCreatedTokens(address creator) external view returns (TokenDetails[] memory) {
        uint256 count = 0;
        for (uint256 i = 0, i < supportedTokens.length; i++) {
            if (tokens[supportedTokens[i]].creator == creator) {
                count++;
            }
        }

        TokenDetails[] memory tokenDetails = new TokenDetails[](count);

        uint256 index = 0;
        for (uint256 i = 0, i < supportedTokens.length; i++) {
            if (tokens[supportedTokens[i]].creator == creator) {
                tokenDetails[index] = tokenDetails[supportedTokens[i]];
                index++;
            }
        }

        return tokenDetails;
    }

    function getAllTokens() external view returns (TokenDetails[] memory) {
        uint256 length = supportedTokens.length;

        TokenDetails[] memory tokenDetails = new TokenDetails[](length);

        for (uint256 i = 0; i < length; i++) {
            tokensDetails[i] = tokenDetails[supportedTokens[i]];
        }

        return tokenDetails;
    }

}