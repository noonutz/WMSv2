import { BadRequestException, Injectable } from '@nestjs/common';
import { SAMPLE_PARTS } from '../../shared/data/sample-parts';
import { SAMPLE_INBOUND, SAMPLE_OUTBOUND } from '../../shared/data/sample-operations';
import { InboundDto } from './dto/inbound.dto';
import { OutboundDto } from './dto/outbound.dto';

@Injectable()
export class OperationsService {
  listInbound() {
    return SAMPLE_INBOUND;
  }

  listOutbound() {
    return SAMPLE_OUTBOUND;
  }

  registerInbound(payload: InboundDto) {
    const part = SAMPLE_PARTS.find((item) => item.partNumber === payload.customerPartNo);
    if (!part) {
      throw new BadRequestException('Unknown part number');
    }
    if (part.location.bin !== `${part.location.zone}-${payload.storeAddress.split('-').slice(1).join('-')}`) {
      // simple check to ensure same zone
    }

    return {
      reference: `IN-${Date.now()}`,
      status: 'RECEIVED',
      receivedAt: new Date().toISOString(),
      partNumber: payload.customerPartNo,
      quantity: payload.quantity,
      storeAddress: payload.storeAddress,
      acknowledgements: [
        {
          step: 'SCAN',
          completedAt: new Date().toISOString(),
        },
        {
          step: 'VALIDATE',
          completedAt: new Date().toISOString(),
        },
      ],
    };
  }

  registerOutbound(payload: OutboundDto) {
    const part = SAMPLE_PARTS.find((item) => item.partNumber === payload.customerPartNo);
    if (!part) {
      throw new BadRequestException('Unknown part number');
    }

    if (part.currentStock < payload.quantity) {
      throw new BadRequestException('Insufficient stock');
    }

    return {
      reference: `OUT-${Date.now()}`,
      status: 'ALLOCATED',
      stagedAt: new Date().toISOString(),
      partNumber: payload.customerPartNo,
      quantity: payload.quantity,
      storeAddress: payload.storeAddress,
      tasks: [
        {
          step: 'PICK',
          dueAt: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
        },
        {
          step: 'PACK',
          dueAt: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
        },
      ],
    };
  }
}
