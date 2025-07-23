import matplotlib.pyplot as plt
import json
import io
from matplotlib.backends.backend_agg import FigureCanvasAgg as FigureCanvas

def load_history(path='project/app/utils/training_history.json'):
    with open(path, 'r') as f:
        return json.load(f)

def generate_training_plot():
    history = load_history()
    acc = history.get('accuracy', [])
    val_acc = history.get('val_accuracy', [])
    loss = history.get('loss', [])
    val_loss = history.get('val_loss', [])
    epochs = range(1, len(acc) + 1)

    # Create figure and axis
    fig, ax1 = plt.subplots(figsize=(12, 6))

    # Plot accuracy on left Y-axis
    ax1.set_title('Model Accuracy & Loss Over Epochs', fontsize=14, weight='bold')
    ax1.set_xlabel('Epochs')
    ax1.set_ylabel('Accuracy', color='green')
    ax1.plot(epochs, acc, color='green', marker='o', label='Train Accuracy')
    ax1.plot(epochs, val_acc, color='blue', marker='s', label='Val Accuracy')
    ax1.tick_params(axis='y', labelcolor='green')

    # Create second Y-axis for loss
    ax2 = ax1.twinx()
    ax2.set_ylabel('Loss', color='red')
    ax2.plot(epochs, loss, color='red', linestyle='--', marker='o', label='Train Loss')
    ax2.plot(epochs, val_loss, color='orange', linestyle='--', marker='s', label='Val Loss')
    ax2.tick_params(axis='y', labelcolor='red')

    # Combine legends
    lines_1, labels_1 = ax1.get_legend_handles_labels()
    lines_2, labels_2 = ax2.get_legend_handles_labels()
    ax1.legend(lines_1 + lines_2, labels_1 + labels_2, loc='upper center', fontsize=10)

    fig.tight_layout(pad=2)

    # Save to buffer
    img = io.BytesIO()
    FigureCanvas(fig).print_png(img)
    img.seek(0)
    plt.close(fig)
    return img

def get_training_statistics():
    history = load_history()
    
    stats = {
        "total_epochs": len(history.get("accuracy", [])),
        "final_training_accuracy": round(history.get("accuracy", [-1])[-1], 4),
        "final_validation_accuracy": round(history.get("val_accuracy", [-1])[-1], 4),
        "final_training_loss": round(history.get("loss", [-1])[-1], 4),
        "final_validation_loss": round(history.get("val_loss", [-1])[-1], 4),
        "best_validation_accuracy": round(max(history.get("val_accuracy", [0])), 4),
        "lowest_validation_loss": round(min(history.get("val_loss", [float("inf")])), 4)
    }
    
    return stats