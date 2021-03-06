package generator

import (
	"math/big"
	"time"

	"github.com/pkg/errors"
	"github.com/vitelabs/go-vite/common/math"
	"github.com/vitelabs/go-vite/common/types"
	"github.com/vitelabs/go-vite/ledger"
)

type IncomingMessage struct {
	BlockType byte

	AccountAddress types.Address
	ToAddress      *types.Address
	FromBlockHash  *types.Hash

	TokenId *types.TokenTypeId
	Amount  *big.Int
	Fee     *big.Int
	Data    []byte

	Difficulty *big.Int
}

func (im *IncomingMessage) ToSendBlock() (*ledger.AccountBlock, error) {
	block := &ledger.AccountBlock{}
	block.AccountAddress = im.AccountAddress
	switch im.BlockType {
	case ledger.BlockTypeSendCall:
		block.AccountAddress = im.AccountAddress
		block.BlockType = im.BlockType
		block.FromBlockHash = types.Hash{}

		block.Data = im.Data

		if im.ToAddress != nil {
			block.ToAddress = *im.ToAddress
		} else {
			return nil, errors.New("block toaddress can't be nil")
		}

		if im.Amount == nil {
			block.Amount = big.NewInt(0)
		} else {
			if im.Amount.Sign() < 0 || im.Amount.BitLen() > math.MaxBigIntLen {
				return nil, errors.New("block amount out of bounds")
			}
			block.Amount = im.Amount
		}

		if im.TokenId != nil {
			block.TokenId = *im.TokenId
		} else {
			return nil, errors.New("block tokenid can't be nil")
		}

		if im.Fee == nil {
			block.Fee = big.NewInt(0)
		} else {
			if im.Fee.Sign() < 0 || im.Fee.BitLen() > math.MaxBigIntLen {
				return nil, errors.New("block fee out of bounds")
			}
			block.Fee = im.Fee
		}

	case ledger.BlockTypeSendCreate:
		block.AccountAddress = im.AccountAddress
		block.BlockType = im.BlockType
		block.FromBlockHash = types.Hash{}

		if im.ToAddress != nil {
			block.ToAddress = *im.ToAddress
		}

		if im.Amount == nil {
			block.Amount = big.NewInt(0)
		} else {
			if im.Amount.Sign() < 0 || im.Amount.BitLen() > math.MaxBigIntLen {
				return nil, errors.New("block amount out of bounds")
			}
			block.Amount = im.Amount
		}

		if im.TokenId != nil {
			block.TokenId = *im.TokenId
		} else {
			return nil, errors.New("block tokenid can't be nil")
		}

		if im.Fee == nil {
			block.Fee = big.NewInt(0)
		} else {
			if im.Fee.Sign() < 0 || im.Fee.BitLen() > math.MaxBigIntLen {
				return nil, errors.New("block fee out of bounds")
			}
			block.Fee = im.Fee
		}

		if len(im.Data) > 0 {
			block.Data = im.Data
		} else {
			return nil, errors.New("block data can't be nil")
		}

	default:
		return nil, errors.New("receive tx can't use func ToSendBlock")
	}
	return block, nil
}

type ConsensusMessage struct {
	SnapshotHash types.Hash
	Timestamp    time.Time
	Producer     types.Address
}
