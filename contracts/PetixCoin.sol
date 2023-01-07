//SPDX-License-Identifier: MIT

pragma solidity >=0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";

//PETIXCOIN, petixcoin sahibi kişileri bir araya getirmek ve ortak çalışmalar 
//yapmak için yazılmış bir smart contract'tır. 

contract PetixCoin is ERC20Capped {
    //1. KISIM: TOKEN İŞLEMLERİ

    event TokenMinted(address minter, uint amount); //token mint edildiğinde
    event TokenBurned(address burner, uint amount); //token yakıldığında


    //kontratın güvenliği için bu kısımda bir owner tesis ediyorum. 
    //Owner'ı constructor'da belirleyeceğim.
    //error yönetimi için require yerine if-revert seçtim. Çünkü custom error yazabiliyorum
    address public owner;
    error NotOwner(address caller);
    modifier onlyOwner() {
        if(msg.sender != owner) {
            revert NotOwner(msg.sender);
        }
        _;
    }

    //constructor'da petixcoin için bir cap ve owner'ı belirleyeceğim.
    //petixcoin 18 decimallı olacak. 18 tane sıfır yazmamak için cap*(10**18) dedim.
    //petixcoinin bir capi olacak, yani maximum üretim/mint miktarı. 
    constructor(uint cap) ERC20("PetixCoin", "PETIX") ERC20Capped(cap*(10**18)) {
        owner = msg.sender;
    }

    //kontrat deploy edildiğinde isteyen herkes buraya gelip 30 tane mint edebilecek.
    //Sonra bu 30 petixcoinin 10 tanesini üyelik ücreti olarak kullabilecek. 
    function mintToken(uint _amount) external {
        require(_amount <= 30, "en fazla 30 coin basabilirsiniz");
        _mint(msg.sender, _amount*(10**18));
        emit TokenMinted(msg.sender, _amount);
    }

    //isteyen herkes bu fonksiyonu kullanarak elindeki petixcoinleri yok edebilecek
    function burnToken(uint _amount) external {
        require(balanceOf(msg.sender) >0, "petixcoininiz zaten yok");
        _burn(msg.sender, _amount*(10**18));
        emit TokenBurned(msg.sender, _amount);
    }

    //petixcoinden şu ana kadar ne kadar coin mint edildiğini öğrenmek için, bu fonksiyonu kullanabiliriz.
    function getTotalSupply() external view returns(uint) {
        return totalSupply() / (10**18);
    }
    //petixcoin kontrat adresini öğrenmek için kullabileceğimiz fonksiyon.
    function getContractAddress() external view returns(address) {
        return address(this);
    }
    //kaç petixcoinimiz olduğunu öğrenmek için kullabileceğimiz fonksiyon.
    //PetixCoin bir ERC20 tokenı olduğu için balanceOf fonksiyonunu kullanabiliyoruz.
    function getYourBalance() external view returns(uint) {
        return balanceOf(msg.sender) / (10**18);
    }
    //bu kontratın kaç petixcoinini olduğunu öğrenmek için kullabileceğimiz fonksiyon.
    function getContractBalance() external view returns(uint) {
        return balanceOf(address(this)) / (10**18);
    }

    //2. KISIM: ÜYELİK İŞLEMLERİ

    address[] internal membersArray; // üye olanlar buraya kaydedilecek
    mapping(address => bool) internal membersMapping; //üyelikleri aktif olanlar burdan görülecek
    struct MembershipDetails {
        address member;
        uint amount;
    }//üye olunurken ne kadar ücret ödendiği bu struct sayesinde kaydedilecek ve aşağıdaki mapping'e işlenecek.
    mapping(uint => MembershipDetails) internal membershipDetailMapping;
    uint internal memberId = 1;

    //isteyenler 10 petixcoin ödedikten sonra petixcoin sistemine üye olabilecek 
    function becomeMember(uint _amount) external {
        require(membersMapping[msg.sender] == false, "zaten uyesiniz");//üye mi değil mi kontrolü
        require(balanceOf(msg.sender) > 9, "en az 10 petixcoininiz olmali"); //üyelik ücreti var mı kontrlü
        require(_amount > 9, "minimum 10 petixcoin");
        transfer(address(this), _amount*(10**18)); //üyelik ücretinin tahsili. Kontrata 10 petixcoin ödeme

        MembershipDetails memory newMember = MembershipDetails(msg.sender, _amount);
        membershipDetailMapping[memberId] = newMember;
        memberId += 1; //üye kaydedildikten sonra memberId'yi 1 artırıyoruz.

        membersArray.push(msg.sender); //üyeler listesine kaydediyoruz
        membersMapping[msg.sender] = true; //üyeliğini aktif hale getiriyoruz.

    }

    //üyelikten çıkma fonksiyonu
    function leaveMembership() external {
        membersMapping[msg.sender] = false;
    }
    //üyelik aktif mi değil mi kontrlü fonksiyonu
    function checkMyMembership() external view returns(bool) {
        return membersMapping[msg.sender];
    }
    //başkasının üyeliğinin aktif olup olmadığını görme fonksiyonu
    function seeMembers(address otherMember) external view returns(bool) {
        return membersMapping[otherMember];
    }
    //üye olunurken ne kadar ücret ödendiğini görme fonksiyonu
    function seeMembershipDetails(uint _id) external view returns(MembershipDetails memory) {
        return membershipDetailMapping[_id];
    }
}