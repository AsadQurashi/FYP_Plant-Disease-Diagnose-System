import json
import matplotlib.pyplot as plt
import io
from matplotlib.backends.backend_agg import FigureCanvasAgg as FigureCanvas

def load_history(json_path):
    with open(json_path, 'r') as file:
        history = json.load(file)
    return history

def generate_training_plot(json_path):
    history = load_history(json_path)
    epochs = range(1, len(history['accuracy']) + 1)

    fig, axs = plt.subplots(1, 2, figsize=(14, 5))

    axs[0].plot(epochs, history['accuracy'], label='Train Accuracy')
    axs[0].plot(epochs, history['val_accuracy'], label='Validation Accuracy')
    axs[0].set_title('Accuracy over Epochs')
    axs[0].set_xlabel('Epochs')
    axs[0].set_ylabel('Accuracy')
    axs[0].legend()

    axs[1].plot(epochs, history['loss'], label='Train Loss')
    axs[1].plot(epochs, history['val_loss'], label='Validation Loss')
    axs[1].set_title('Loss over Epochs')
    axs[1].set_xlabel('Epochs')
    axs[1].set_ylabel('Loss')
    axs[1].legend()

    plt.tight_layout()

    img = io.BytesIO()
    FigureCanvas(fig).print_png(img)
    img.seek(0)
    plt.close(fig)
    return img
