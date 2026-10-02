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
  swot_analysis: {
    id: "n0",
    text: "SWOT 비즈니스 전략",
    children: [
      {
        id: "n1",
        text: "내부 역량 분석",
        children: [
          { id: "n11", text: "강점 (S): 독자 기술력, 브랜드 신뢰도", children: [] },
          { id: "n12", text: "약점 (W): 초기 자본력 부족, 해외 네트워크 미비", children: [] }
        ]
      },
      {
        id: "n2",
        text: "외부 환경 분석",
        children: [
          { id: "n21", text: "기회 (O): 비대면 에듀테크 시장 급성장", children: [] },
          { id: "n22", text: "위협 (T): 빅테크 기업의 시장 진입, 규제 강화", children: [] }
        ]
      },
      {
        id: "n3",
        text: "교차 실행 전략",
        children: [
          { id: "n31", text: "SO 전략: 기술력 기반 시장 선점", children: [] },
          { id: "n32", text: "WT 전략: 틈새시장 집중 및 제휴 방어", children: [] }
        ]
      }
    ]
  },
  root_cause_5whys: {
    id: "n0",
    text: "현상: 서버 응답 지연 발생",
    children: [
      {
        id: "n1",
        text: "Why 1: DB 커넥션 풀 고갈",
        children: [
          {
            id: "n11",
            text: "Why 2: 슬로우 쿼리 대량 누적",
            children: [
              {
                id: "n111",
                text: "Why 3: 인덱스 누락된 검색 쿼리 급증",
                children: [
                  {
                    id: "n1111",
                    text: "Why 4: 배포 전 쿼리 성능 검증 생략",
                    children: [
                      { id: "n11111", text: "Why 5 (근본 원인): CI/CD 성능 테스트 파이프라인 부재", children: [] }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  okr_goal: {
    id: "n0",
    text: "Q4 Objective: 글로벌 에듀테크 1위 달성",
    children: [
      {
        id: "n1",
        text: "KR 1: 월간 활성 사용자(MAU) 100만 명 돌파",
        children: [
          { id: "n11", text: "SEO 최적화 및 3,000단어 DB 오픈", children: [] },
          { id: "n12", text: "모바일 반응형 완결(가로스크롤 0px)", children: [] }
        ]
      },
      {
        id: "n2",
        text: "KR 2: 학습 완독률(Completion Rate) 85% 달성",
        children: [
          { id: "n21", text: "에빙하우스 망각곡선 복습 푸시", children: [] },
          { id: "n22", text: "Day별 40단어 성취 뱃지 시스템", children: [] }
        ]
      },
      {
        id: "n3",
        text: "KR 3: 고객 순추천지수(NPS) 75점 이상 유지",
        children: [
          { id: "n31", text: "100% 무광고 깔끔 UI 유지", children: [] },
          { id: "n32", text: "초고속 0ms 로컬 브라우저 연산", children: [] }
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
