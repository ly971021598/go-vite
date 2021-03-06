package discovery

import (
	"bytes"
	crand "crypto/rand"
	"math/rand"
	"testing"
	"time"

	"github.com/vitelabs/go-vite/common/types"

	"github.com/vitelabs/go-vite/crypto/ed25519"
	"github.com/vitelabs/go-vite/p2p/network"
)

func TestUnpack(t *testing.T) {
	pub, priv, err := ed25519.GenerateKey(nil)
	if err != nil {
		t.Fatal(err)
	}

	var id NodeID
	copy(id[:], pub)
	p := new(Ping)
	p.ID = id
	p.Expiration = getExpiration()

	data, _, err := p.pack(priv)
	if err != nil {
		t.Fatal(err)
	}

	pkt, err := unPacket(data)
	if err != nil {
		t.Fatal(err)
	}

	p2, ok := pkt.msg.(*Ping)
	if !ok {
		t.Fatal()
	}
	if p2.Expiration.Unix() != p.Expiration.Unix() {
		t.Fatal()
	}

}

func TestPing_serialize(t *testing.T) {
	p1 := &Ping{
		TCP: mockPort(),
		Net: network.ID(rand.Uint32()),
		Ext: mockRest(),
	}
	p1.ID = mockID()
	p1.Expiration = time.Now()

	data, err := p1.serialize()
	if err != nil {
		t.Error(err)
	}
	p2 := new(Ping)
	err = p2.deserialize(data)
	if err != nil {
		t.Error(err)
	}

	if p1.ID != p2.ID {
		t.Fail()
	}
	if p1.TCP != p2.TCP {
		t.Fail()
	}
	if p1.Net != p2.Net {
		t.Fail()
	}
	if !bytes.Equal(p1.Ext, p2.Ext) {
		t.Fail()
	}
	if p1.Expiration.Unix() != p2.Expiration.Unix() {
		t.Fail()
	}
}

func TestPong_serialize(t *testing.T) {
	var hash types.Hash
	crand.Read(hash[:])
	p1 := &Pong{
		Ping: hash,
	}
	p1.ID = mockID()
	p1.Expiration = time.Now()

	data, err := p1.serialize()
	if err != nil {
		t.Error(err)
	}
	p2 := new(Pong)
	err = p2.deserialize(data)
	if err != nil {
		t.Error(err)
	}

	if p1.ID != p2.ID {
		t.Fail()
	}
	if p1.Ping != p2.Ping {
		t.Fail()
	}
	if p1.Expiration.Unix() != p2.Expiration.Unix() {
		t.Fail()
	}
}

func TestFindNode_serialize(t *testing.T) {
	p1 := &FindNode{
		ID:         mockID(),
		Target:     mockID(),
		Expiration: time.Now(),
	}

	data, err := p1.serialize()
	if err != nil {
		t.Error(err)
	}
	p2 := new(FindNode)
	err = p2.deserialize(data)
	if err != nil {
		t.Error(err)
	}

	if p1.ID != p2.ID {
		t.Fail()
	}
	if p1.Target != p2.Target {
		t.Fail()
	}
	if p1.Expiration.Unix() != p2.Expiration.Unix() {
		t.Fail()
	}
}

func TestNeighbors_serialize(t *testing.T) {
	p1 := &Neighbors{
		Nodes: []*Node{
			mockNode(true),
			mockNode(true),
			mockNode(true),
			mockNode(true),
			mockNode(true),
			mockNode(true),
			mockNode(true),
		},
	}
	p1.ID = mockID()
	p1.Expiration = time.Now()

	data, err := p1.serialize()
	if err != nil {
		t.Error(err)
	}
	p2 := new(Neighbors)
	err = p2.deserialize(data)
	if err != nil {
		t.Error(err)
	}

	if p1.ID != p2.ID {
		t.Fail()
	}
	if len(p1.Nodes) != len(p2.Nodes) {
		t.Fail()
	}
	for i, node := range p1.Nodes {
		if !compare(node, p2.Nodes[i], true) {
			t.Fail()
		}
	}
	if p1.Expiration.Unix() != p2.Expiration.Unix() {
		t.Fail()
	}
}
