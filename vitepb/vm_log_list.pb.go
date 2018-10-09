// Code generated by protoc-gen-go. DO NOT EDIT.
// source: vitepb/vm_log_list.proto

package vitepb

import (
	fmt "fmt"
	proto "github.com/golang/protobuf/proto"
	math "math"
)

// Reference imports to suppress errors if they are not otherwise used.
var _ = proto.Marshal
var _ = fmt.Errorf
var _ = math.Inf

// This is a compile-time assertion to ensure that this generated file
// is compatible with the proto package it is being compiled against.
// A compilation error at this line likely means your copy of the
// proto package needs to be updated.
const _ = proto.ProtoPackageIsVersion2 // please upgrade the proto package

type VmLog struct {
	Topics               [][]byte `protobuf:"bytes,1,rep,name=topics,proto3" json:"topics,omitempty"`
	Data                 []byte   `protobuf:"bytes,2,opt,name=data,proto3" json:"data,omitempty"`
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *VmLog) Reset()         { *m = VmLog{} }
func (m *VmLog) String() string { return proto.CompactTextString(m) }
func (*VmLog) ProtoMessage()    {}
func (*VmLog) Descriptor() ([]byte, []int) {
	return fileDescriptor_6765d368524708d9, []int{0}
}

func (m *VmLog) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_VmLog.Unmarshal(m, b)
}
func (m *VmLog) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_VmLog.Marshal(b, m, deterministic)
}
func (m *VmLog) XXX_Merge(src proto.Message) {
	xxx_messageInfo_VmLog.Merge(m, src)
}
func (m *VmLog) XXX_Size() int {
	return xxx_messageInfo_VmLog.Size(m)
}
func (m *VmLog) XXX_DiscardUnknown() {
	xxx_messageInfo_VmLog.DiscardUnknown(m)
}

var xxx_messageInfo_VmLog proto.InternalMessageInfo

func (m *VmLog) GetTopics() [][]byte {
	if m != nil {
		return m.Topics
	}
	return nil
}

func (m *VmLog) GetData() []byte {
	if m != nil {
		return m.Data
	}
	return nil
}

type VmLogList struct {
	List                 []*VmLog `protobuf:"bytes,1,rep,name=list,proto3" json:"list,omitempty"`
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *VmLogList) Reset()         { *m = VmLogList{} }
func (m *VmLogList) String() string { return proto.CompactTextString(m) }
func (*VmLogList) ProtoMessage()    {}
func (*VmLogList) Descriptor() ([]byte, []int) {
	return fileDescriptor_6765d368524708d9, []int{1}
}

func (m *VmLogList) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_VmLogList.Unmarshal(m, b)
}
func (m *VmLogList) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_VmLogList.Marshal(b, m, deterministic)
}
func (m *VmLogList) XXX_Merge(src proto.Message) {
	xxx_messageInfo_VmLogList.Merge(m, src)
}
func (m *VmLogList) XXX_Size() int {
	return xxx_messageInfo_VmLogList.Size(m)
}
func (m *VmLogList) XXX_DiscardUnknown() {
	xxx_messageInfo_VmLogList.DiscardUnknown(m)
}

var xxx_messageInfo_VmLogList proto.InternalMessageInfo

func (m *VmLogList) GetList() []*VmLog {
	if m != nil {
		return m.List
	}
	return nil
}

func init() {
	proto.RegisterType((*VmLog)(nil), "vitepb.VmLog")
	proto.RegisterType((*VmLogList)(nil), "vitepb.VmLogList")
}

func init() { proto.RegisterFile("vitepb/vm_log_list.proto", fileDescriptor_6765d368524708d9) }

var fileDescriptor_6765d368524708d9 = []byte{
	// 134 bytes of a gzipped FileDescriptorProto
	0x1f, 0x8b, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0xff, 0xe2, 0x92, 0x28, 0xcb, 0x2c, 0x49,
	0x2d, 0x48, 0xd2, 0x2f, 0xcb, 0x8d, 0xcf, 0xc9, 0x4f, 0x8f, 0xcf, 0xc9, 0x2c, 0x2e, 0xd1, 0x2b,
	0x28, 0xca, 0x2f, 0xc9, 0x17, 0x62, 0x83, 0xc8, 0x28, 0x19, 0x73, 0xb1, 0x86, 0xe5, 0xfa, 0xe4,
	0xa7, 0x0b, 0x89, 0x71, 0xb1, 0x95, 0xe4, 0x17, 0x64, 0x26, 0x17, 0x4b, 0x30, 0x2a, 0x30, 0x6b,
	0xf0, 0x04, 0x41, 0x79, 0x42, 0x42, 0x5c, 0x2c, 0x29, 0x89, 0x25, 0x89, 0x12, 0x4c, 0x0a, 0x8c,
	0x1a, 0x3c, 0x41, 0x60, 0xb6, 0x92, 0x1e, 0x17, 0x27, 0x58, 0x93, 0x4f, 0x66, 0x71, 0x89, 0x90,
	0x22, 0x17, 0x0b, 0xc8, 0x5c, 0xb0, 0x36, 0x6e, 0x23, 0x5e, 0x3d, 0x88, 0xc1, 0x7a, 0x60, 0x05,
	0x41, 0x60, 0xa9, 0x24, 0x36, 0xb0, 0x9d, 0xc6, 0x80, 0x00, 0x00, 0x00, 0xff, 0xff, 0xc6, 0x25,
	0xae, 0x23, 0x8f, 0x00, 0x00, 0x00,
}
