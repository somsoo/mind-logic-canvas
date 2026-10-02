// Preset Hierarchical Tree Data
const PRESETS = {
  civil_law: {
    id: "n0",
    text: "권리의 변동",
    children: [
      {
        id: "n1",
        text: "법률행위 (의사표시)",
        children: [
          { id: "n11", text: "단독행위 (취소, 해제)", children: [] },
          { id: "n12", text: "계약 (매매, 임대차)", children: [] }
        ]
      },
      {
        id: "n2",
        text: "법률의 규정",
        children: [
          { id: "n21", text: "소멸시효 완성", children: [] },
          { id: "n22", text: "취득시효 (20년 점유)", children: [] }
        ]
      }
    ]
  },
  mece_biz: {
    id: "n0",
    text: "기업 매출 극대화",
    children: [
      {
        id: "n1",
        text: "고객 수 증대",
        children: [
          { id: "n11", text: "신규 유입 확대 (SNS/광고)", children: [] },
          { id: "n12", text: "기존 고객 이탈 방지", children: [] }
        ]
      },
      {
        id: "n2",
        text: "객단가 상승",
        children: [
          { id: "n21", text: "프리미엄 요금제 도입", children: [] },
          { id: "n22", text: "크로스셀/업셀 번들링", children: [] }
        ]
      }
    ]
  },
  sw_arch: {
    id: "n0",
    text: "3계층 아키텍처",
    children: [
      {
        id: "n1",
        text: "프레젠테이션 계층",
        children: [
          { id: "n11", text: "SPA UI (웹 브라우저)", children: [] },
          { id: "n12", text: "모바일 앱 클라이언트", children: [] }
        ]
      },
      {
        id: "n2",
        text: "비즈니스 로직 계층",
        children: [
          { id: "n21", text: "도메인 서비스 엔진", children: [] },
          { id: "n22", text: "인증 & 권한 미들웨어", children: [] }
        ]
      },
      {
        id: "n3",
        text: "데이터 저장 계층",
        children: [
          { id: "n31", text: "관계형 RDBMS", children: [] },
          { id: "n32", text: "Redis 인메모리 캐시", children: [] }
        ]
      }
    ]
  },
  empty: {
    id: "n0",
    text: "중심 아이디어",
    children: []
  }
};

class MindLogicCanvas {
  constructor() {
    this.root = JSON.parse(JSON.stringify(PRESETS.civil_law));
    this.selectedNodeId = "n0";
    this.panX = 60;
    this.panY = 140;
    this.scale = 1.0;
    this.isPanning = false;
    this.startPanPos = { x: 0, y: 0 };
    this.collapsedNodes = new Set();

    this.viewport = document.getElementById('viewport');
    this.svgLines = document.getElementById('svgLines');
    this.nodesLayer = document.getElementById('nodesLayer');
    this.templateSelect = document.getElementById('templateSelect');

    this.initEvents();
    this.render();
  }

  initEvents() {
    // Template Selector
    this.templateSelect.addEventListener('change', (e) => {
      const key = e.target.value;
      this.root = JSON.parse(JSON.stringify(PRESETS[key] || PRESETS.empty));
      this.selectedNodeId = this.root.id;
      this.collapsedNodes.clear();
      this.panX = 60;
      this.panY = 140;
      this.render();
    });

    // Toolbar Buttons
    document.getElementById('addChildBtn').addEventListener('click', () => this.addChildNode());
    document.getElementById('addSiblingBtn').addEventListener('click', () => this.addSiblingNode());
    document.getElementById('deleteNodeBtn').addEventListener('click', () => this.deleteNode());
    document.getElementById('toggleCollapseBtn').addEventListener('click', () => this.toggleCollapseSelected());
    document.getElementById('resetZoomBtn').addEventListener('click', () => {
      this.panX = 60;
      this.panY = 140;
      this.scale = 1.0;
      this.render();
    });

    // Viewport Panning
    this.viewport.addEventListener('pointerdown', (e) => {
      if (e.target.closest('.tree-node')) return;
      this.isPanning = true;
      this.startPanPos = { x: e.clientX - this.panX, y: e.clientY - this.panY };
      this.viewport.setPointerCapture(e.pointerId);
    });

    this.viewport.addEventListener('pointermove', (e) => {
      if (!this.isPanning) return;
      this.panX = e.clientX - this.startPanPos.x;
      this.panY = e.clientY - this.startPanPos.y;
      this.updateTransform();
    });

    const stopPan = () => { this.isPanning = false; };
    this.viewport.addEventListener('pointerup', stopPan);
    this.viewport.addEventListener('pointercancel', stopPan);

    // Keyboard Shortcuts
    window.addEventListener('keydown', (e) => {
      if (document.activeElement && document.activeElement.isContentEditable) {
        if (e.key === 'Enter') {
          e.preventDefault();
          document.activeElement.blur();
          this.addSiblingNode();
        } else if (e.key === 'Tab') {
          e.preventDefault();
          document.activeElement.blur();
          this.addChildNode();
        }
        return;
      }

      if (e.key === 'Tab') {
        e.preventDefault();
        this.addChildNode();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        this.addSiblingNode();
      } else if (e.key === 'Delete' || e.key === 'Backspace') {
        this.deleteNode();
      }
    });
  }

  findNode(node, id) {
    if (node.id === id) return node;
    for (let c of node.children) {
      const res = this.findNode(c, id);
      if (res) return res;
    }
    return null;
  }

  findParent(node, childId) {
    for (let c of node.children) {
      if (c.id === childId) return node;
      const res = this.findParent(c, childId);
      if (res) return res;
    }
    return null;
  }

  addChildNode() {
    const parent = this.findNode(this.root, this.selectedNodeId);
    if (!parent) return;
    this.collapsedNodes.delete(parent.id);
    const newId = "n_" + Date.now();
    const newNode = { id: newId, text: "새 하위 논점", children: [] };
    parent.children.push(newNode);
    this.selectedNodeId = newId;
    this.render();
  }

  addSiblingNode() {
    if (this.selectedNodeId === this.root.id) {
      this.addChildNode();
      return;
    }
    const parent = this.findParent(this.root, this.selectedNodeId);
    if (!parent) return;
    const newId = "n_" + Date.now();
    const newNode = { id: newId, text: "새 동급 논점", children: [] };
    parent.children.push(newNode);
    this.selectedNodeId = newId;
    this.render();
  }

  deleteNode() {
    if (this.selectedNodeId === this.root.id) {
      alert("루트 노드는 삭제할 수 없습니다.");
      return;
    }
    const parent = this.findParent(this.root, this.selectedNodeId);
    if (!parent) return;
    parent.children = parent.children.filter(c => c.id !== this.selectedNodeId);
    this.selectedNodeId = parent.id;
    this.render();
  }

  toggleCollapseSelected() {
    if (this.collapsedNodes.has(this.selectedNodeId)) {
      this.collapsedNodes.delete(this.selectedNodeId);
    } else {
      this.collapsedNodes.add(this.selectedNodeId);
    }
    this.render();
  }

  // Tree Layout Algorithm (X: Level, Y: Subtree Height)
  computeLayout(node, level = 0, yOffset = 0) {
    const isCollapsed = this.collapsedNodes.has(node.id);
    const nodeWidth = 140;
    const nodeHeight = 44;
    const levelSpacing = 180;
    const rowSpacing = 20;

    let totalHeight = 0;
    const layoutChildren = [];

    if (!isCollapsed && node.children.length > 0) {
      let currentY = yOffset;
      for (let child of node.children) {
        const childLayout = this.computeLayout(child, level + 1, currentY);
        layoutChildren.push(childLayout);
        currentY += childLayout.height + rowSpacing;
      }
      totalHeight = currentY - yOffset - rowSpacing;
    } else {
      totalHeight = nodeHeight;
    }

    const nodeY = isCollapsed || node.children.length === 0
      ? yOffset
      : layoutChildren[0].y + (layoutChildren[layoutChildren.length - 1].y - layoutChildren[0].y) / 2;

    return {
      node,
      level,
      x: level * levelSpacing,
      y: nodeY,
      width: nodeWidth,
      height: Math.max(totalHeight, nodeHeight),
      children: layoutChildren
    };
  }

  render() {
    this.nodesLayer.innerHTML = '';
    this.svgLines.innerHTML = '';
    const layout = this.computeLayout(this.root);

    this.renderSubtree(layout);
    this.updateTransform();
  }

  renderSubtree(item) {
    const { node, level, x, y, children } = item;

    // Node Box
    const div = document.createElement('div');
    div.className = `tree-node level-${Math.min(level, 2)} ${node.id === this.selectedNodeId ? 'selected' : ''}`;
    div.style.left = `${x}px`;
    div.style.top = `${y}px`;

    const span = document.createElement('div');
    span.className = 'node-text';
    span.contentEditable = true;
    span.textContent = node.text;
    span.addEventListener('input', () => {
      node.text = span.textContent;
    });
    span.addEventListener('focus', () => {
      this.selectedNodeId = node.id;
      document.querySelectorAll('.tree-node').forEach(n => n.classList.remove('selected'));
      div.classList.add('selected');
    });

    div.appendChild(span);

    // Toggle Collapse Button
    if (node.children.length > 0) {
      const toggle = document.createElement('div');
      toggle.className = 'collapse-toggle';
      toggle.textContent = this.collapsedNodes.has(node.id) ? '+' : '-';
      toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        this.selectedNodeId = node.id;
        this.toggleCollapseSelected();
      });
      div.appendChild(toggle);
    }

    div.addEventListener('click', () => {
      this.selectedNodeId = node.id;
      document.querySelectorAll('.tree-node').forEach(n => n.classList.remove('selected'));
      div.classList.add('selected');
    });

    this.nodesLayer.appendChild(div);

    // Connect Lines (Cubic Bezier Curves)
    const nodeW = 140;
    const nodeH = 40;
    const startX = x + nodeW;
    const startY = y + nodeH / 2;

    children.forEach(c => {
      const endX = c.x;
      const endY = c.y + nodeH / 2;
      const midX = (startX + endX) / 2;

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', `M ${startX} ${startY} C ${midX} ${startY}, ${midX} ${endY}, ${endX} ${endY}`);
      path.setAttribute('stroke', '#cbd5e1');
      path.setAttribute('stroke-width', '2');
      path.setAttribute('fill', 'none');
      this.svgLines.appendChild(path);

      this.renderSubtree(c);
    });
  }

  updateTransform() {
    this.nodesLayer.style.transform = `translate(${this.panX}px, ${this.panY}px) scale(${this.scale})`;
    this.svgLines.style.transform = `translate(${this.panX}px, ${this.panY}px) scale(${this.scale})`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new MindLogicCanvas();
});
